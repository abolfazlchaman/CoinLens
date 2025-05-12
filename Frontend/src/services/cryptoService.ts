import { MarketData, GlobalData, TrendingCoin, Exchange, NewsItem } from '../types/crypto';

const API_BASE_URL = 'http://localhost:3001/api';

export const cryptoService = {
  async getMarketData(): Promise<MarketData[]> {
    const response = await fetch(`${API_BASE_URL}/market-data`);
    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }
    return response.json();
  },

  async getGlobalData(): Promise<GlobalData> {
    const response = await fetch(`${API_BASE_URL}/global-data`);
    if (!response.ok) {
      throw new Error('Failed to fetch global data');
    }
    return response.json();
  },

  async getTrendingCoins(): Promise<TrendingCoin[]> {
    const response = await fetch(`${API_BASE_URL}/trending-coins`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending coins');
    }
    return response.json();
  },

  async getCoinPrice(coinId: string): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/price/${coinId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch coin price');
    }
    const data = await response.json();
    return data.price;
  },

  async getExchanges(): Promise<Exchange[]> {
    const response = await fetch(`${API_BASE_URL}/exchanges`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchanges');
    }
    return response.json();
  },

  async getNews(): Promise<NewsItem[]> {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
  },
}; 