import type { MarketData, GlobalData, TrendingCoin, Exchange, NewsItem, CoinGeckoTrendingResponse } from './coingecko.service';
import { redisClient } from '../config/redis';
import { logger } from '../utils/logger';

export class FallbackService {
  private static instance: FallbackService;
  private readonly FALLBACK_PREFIX = 'fallback:';

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
    const prices: { [key: string]: number } = {
      bitcoin: 50000,
      ethereum: 3000,
    };
    return prices[coinId] || 0;
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
}

export const fallbackService = FallbackService.getInstance(); 