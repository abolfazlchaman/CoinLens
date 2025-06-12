import type { MarketData, GlobalData, TrendingCoin, Exchange, NewsItem, CoinGeckoTrendingResponse } from './coingecko.service';
import { redisClient } from '../config/redis';
import { logger } from '../utils/logger';

export interface MarketSentiment {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export class FallbackService {
  private static instance: FallbackService;
  private readonly FALLBACK_PREFIX = 'fallback:';
  private readonly CACHE_TTL = 600; // 10 minutes in seconds

  private constructor() {}

  public static getInstance(): FallbackService {
    if (!FallbackService.instance) {
      FallbackService.instance = new FallbackService();
    }
    return FallbackService.instance;
  }

  private async getFallbackData<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get(`${this.FALLBACK_PREFIX}${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Error getting fallback data for ${key}:`, error);
      return null;
    }
  }

  private async setFallbackData<T>(key: string, data: T): Promise<void> {
    try {
      await redisClient.set(`${this.FALLBACK_PREFIX}${key}`, JSON.stringify(data));
    } catch (error) {
      logger.error(`Error setting fallback data for ${key}:`, error);
    }
  }

  public async updateFallbackData<T>(key: string, data: T): Promise<void> {
    await this.setFallbackData(key, data);
  }

  public async getMarketData(): Promise<MarketData[]> {
    const fallbackData = await this.getFallbackData<MarketData[]>('market-data');
    if (!fallbackData) {
      logger.warn('No fallback market data available');
      return [];
    }
    return fallbackData;
  }

  public async getGlobalData(): Promise<GlobalData> {
    const fallbackData = await this.getFallbackData<GlobalData>('global-data');
    if (!fallbackData) {
      logger.warn('No fallback global data available');
      return {
        data: {
          total_market_cap: { usd: 0 },
          total_volume: { usd: 0 },
          market_cap_percentage: {},
          market_cap_change_percentage_24h_usd: 0,
        },
      };
    }
    return fallbackData;
  }

  public async getTrendingCoins(): Promise<CoinGeckoTrendingResponse> {
    const fallbackData = await this.getFallbackData<CoinGeckoTrendingResponse>('trending-coins');
    if (!fallbackData) {
      logger.warn('No fallback trending data available');
      return { coins: [] };
    }
    return fallbackData;
  }

  public async getCoinPrice(coinId: string): Promise<number> {
    try {
      // Try to get the price from the cached market data first
      const marketData = await this.getMarketData();
      const coin = marketData.find((coin) => coin.id === coinId);
      if (coin) {
        return coin.current_price;
      }

      // If not found in market data, try to get from global data
      const globalData = await this.getGlobalData();
      if (globalData.data.market_cap_percentage[coinId]) {
        // If we have market cap percentage, we can estimate the price
        // This is a fallback estimation and should be used with caution
        const totalMarketCap = globalData.data.total_market_cap.usd;
        const marketCapPercentage = globalData.data.market_cap_percentage[coinId];
        const estimatedMarketCap = (totalMarketCap * marketCapPercentage) / 100;
        
        // Get circulating supply from market data if available
        const coinData = marketData.find((c) => c.id === coinId);
        const circulatingSupply = coinData?.circulating_supply || 0;
        if (circulatingSupply > 0) {
          return estimatedMarketCap / circulatingSupply;
        }
      }

      logger.warn(`No fallback price data available for ${coinId}`);
      return 0;
    } catch (error) {
      logger.error(`Error getting fallback price for ${coinId}:`, error);
      return 0;
    }
  }

  public async getExchanges(): Promise<Exchange[]> {
    const fallbackData = await this.getFallbackData<Exchange[]>('exchanges');
    if (!fallbackData) {
      logger.warn('No fallback exchanges data available');
      return [];
    }
    return fallbackData;
  }

  public async getNews(): Promise<NewsItem[]> {
    const fallbackData = await this.getFallbackData<NewsItem[]>('news');
    if (!fallbackData) {
      logger.warn('No fallback news data available');
      return [];
    }
    return fallbackData;
  }

  private async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      return null;
    } catch (error) {
      logger.error('Redis error:', error);
      return null;
    }
  }

  private async setCachedData<T>(key: string, data: T): Promise<void> {
    try {
      await redisClient.setex(key, this.CACHE_TTL, JSON.stringify(data));
    } catch (error) {
      logger.error('Redis error:', error);
    }
  }

  async getMarketSentiment(): Promise<MarketSentiment> {
    try {
      // Try to get from Redis first
      const cachedData = await this.getCachedData<MarketSentiment>('market-sentiment');
      if (cachedData) {
        return cachedData;
      }

      // If not in Redis, return default fallback data
      return {
        value: '50',
        value_classification: 'Neutral',
        timestamp: new Date().toISOString(),
        time_until_update: '1 hour',
      };
    } catch (error) {
      logger.error('Error getting market sentiment fallback:', error);
      // Return default fallback data if Redis fails
      return {
        value: '50',
        value_classification: 'Neutral',
        timestamp: new Date().toISOString(),
        time_until_update: '1 hour',
      };
    }
  }
}

export const fallbackService = FallbackService.getInstance(); 