import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_1h_in_currency?: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_percentage: { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  description: string;
}

export interface Exchange {
  id: string;
  name: string;
  country: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

export interface MarketSentiment {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export const cryptoApi = {
  getMarketData: async (): Promise<MarketData[]> => {
    const { data } = await api.get('/market-data');
    return data;
  },

  getGlobalData: async (): Promise<GlobalData> => {
    const { data } = await api.get('/global-data');
    return data;
  },

  getTrendingCoins: async (): Promise<TrendingCoin[]> => {
    const { data } = await api.get('/trending-coins');
    return data;
  },

  getCoinPrice: async (coinId: string): Promise<number> => {
    const { data } = await api.get(`/coin-price/${coinId}`);
    return data.price;
  },

  getNews: async (): Promise<NewsItem[]> => {
    const { data } = await api.get('/news');
    return data;
  },

  getExchanges: async (): Promise<Exchange[]> => {
    const { data } = await api.get('/exchanges');
    return data;
  },

  getMarketSentiment: async (): Promise<MarketSentiment> => {
    const { data } = await api.get('/market-sentiment');
    return data;
  },
}; 