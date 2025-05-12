import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

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
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_percentage: { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
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
  price_btc: number;
  score: number;
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

export const cryptoApi = {
  async getMarketData(): Promise<MarketData[]> {
    const response = await axios.get(`${API_BASE_URL}/market-data`);
    return response.data;
  },

  async getGlobalData(): Promise<GlobalData> {
    const response = await axios.get(`${API_BASE_URL}/global-data`);
    return response.data;
  },

  async getTrendingCoins(): Promise<TrendingCoin[]> {
    const response = await axios.get(`${API_BASE_URL}/trending-coins`);
    return response.data;
  },

  async getCoinPrice(coinId: string): Promise<number> {
    const response = await axios.get(`${API_BASE_URL}/coin-price/${coinId}`);
    return response.data.price;
  },

  async getExchanges(): Promise<Exchange[]> {
    const response = await axios.get(`${API_BASE_URL}/exchanges`);
    return response.data;
  },

  async getNews(): Promise<NewsItem[]> {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
  },

  async getMarketSentiment(): Promise<MarketSentiment> {
    const response = await axios.get(`${API_BASE_URL}/market-sentiment`);
    return response.data;
  },
}; 