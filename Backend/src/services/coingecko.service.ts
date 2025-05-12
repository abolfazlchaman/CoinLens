import axios from 'axios';
import { redisClient } from '../config/redis';
import { logger } from '../utils/logger';
import { fallbackService } from './fallback.service';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const CACHE_TTL = 600; // 10 minutes in seconds
const RATE_LIMIT_DELAY = 60000; // 1 minute in milliseconds

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_1h_in_currency: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface GlobalData {
  data: {
    total_market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    market_cap_percentage: { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
  };
}

export interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    price_btc: number;
    score: number;
  };
}

export interface Exchange {
  id: string;
  name: string;
  country: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  description: string;
}

export interface MarketSentiment {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export class CoinGeckoService {
  private static instance: CoinGeckoService;

  private constructor() {}

  static getInstance(): CoinGeckoService {
    if (!CoinGeckoService.instance) {
      CoinGeckoService.instance = new CoinGeckoService();
    }
    return CoinGeckoService.instance;
  }

  private async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        console.log(`Cache hit for key: ${key}`);
        return JSON.parse(cachedData);
      }
      console.log(`Cache miss for key: ${key}`);
      return null;
    } catch (error) {
      console.error('Redis error:', error);
      return null;
    }
  }

  private async setCachedData<T>(key: string, data: T): Promise<void> {
    try {
      await redisClient.setex(key, CACHE_TTL, JSON.stringify(data));
      console.log(`Cached data for key: ${key}`);
    } catch (error) {
      console.error('Redis error:', error);
    }
  }

  private async fetchWithFallback<T>(
    endpoint: string,
    cacheKey: string,
    fallbackData: () => Promise<T>,
  ): Promise<T> {
    try {
      // Try cache first
      const cached = await this.getCachedData<T>(cacheKey);
      if (cached) {
        return cached;
      }

      // Try API
      console.log(`Fetching from CoinGecko API: ${endpoint}`);
      try {
        const response = await axios.get(`${COINGECKO_API_URL}${endpoint}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
      const data = response.data;
      
      // Cache the result
      await this.setCachedData(cacheKey, data);
      return data;
      } catch (apiError: any) {
        if (apiError.response?.status === 429) {
          logger.warn('Rate limit hit, using fallback data');
          // Cache the fallback data to prevent immediate retries
          const fallback = await fallbackData();
          await this.setCachedData(cacheKey, fallback);
          return fallback;
        }
        throw apiError;
      }
    } catch (error) {
      logger.error(`Error fetching from CoinGecko API (${endpoint}):`, error);
      
      // Try fallback
      logger.info('Using fallback data...');
      const fallback = await fallbackData();
      return fallback;
    }
  }

  async getMarketData(): Promise<MarketData[]> {
    return this.fetchWithFallback(
      '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
      'market-data',
      () => fallbackService.getMarketData(),
    );
  }

  async getGlobalData(): Promise<GlobalData> {
    return this.fetchWithFallback(
      '/global',
      'global-data',
      () => fallbackService.getGlobalData(),
    );
  }

  async getTrendingCoins(): Promise<TrendingCoin[]> {
    return this.fetchWithFallback(
      '/search/trending',
      'trending-coins',
      () => fallbackService.getTrendingCoins(),
    );
  }

  async getExchanges(): Promise<Exchange[]> {
    return this.fetchWithFallback(
      '/exchanges?per_page=10',
      'exchanges',
      () => fallbackService.getExchanges(),
    );
  }

  async getCoinPrice(coinId: string): Promise<number> {
    const cacheKey = `coin_price_${coinId}`;
    const cachedData = await this.getCachedData<number>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: 'usd',
        },
      });
      const price = response.data[coinId]?.usd;
      if (price) {
      await this.setCachedData(cacheKey, price);
      return price;
      }
      throw new Error(`Price not found for ${coinId}`);
    } catch (error) {
      logger.error(`Error fetching price for ${coinId}:`, error);
      throw error;
    }
  }

  async getNews(): Promise<NewsItem[]> {
    return this.fetchWithFallback(
      '/news',
      'news',
      () => fallbackService.getNews(),
    );
  }

  async getMarketSentiment(): Promise<MarketSentiment> {
    const cacheKey = 'market-sentiment';
    const cachedData = await this.getCachedData<MarketSentiment>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await axios.get('https://api.alternative.me/fng/', {
        params: {
          limit: 1,
        },
      });
      const data = response.data.data[0];
      await this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      logger.error('Error fetching market sentiment:', error);
      // Return fallback data
      return {
        value: '50',
        value_classification: 'Neutral',
        timestamp: new Date().toISOString(),
        time_until_update: '1 hour',
      };
    }
  }
} 