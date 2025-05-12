import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
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
    symbol: string;
    name: string;
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
  year_established: number;
  country: string;
  description: string;
  url: string;
  image: string;
  has_trading_incentive: boolean;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  image_url: string;
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

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}

export interface Portfolio {
  items: PortfolioItem[];
  totalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
}

export const cryptoApi = {
  async getMarketData(): Promise<MarketData[]> {
    const { data } = await axios.get(`${API_BASE_URL}/market-data`);
    return data;
  },

  async getGlobalData(): Promise<GlobalData> {
    const { data } = await axios.get(`${API_BASE_URL}/global-data`);
    return data;
  },

  async getTrendingCoins(): Promise<TrendingCoin[]> {
    const { data } = await axios.get(`${API_BASE_URL}/trending-coins`);
    return data;
  },

  async getCoinPrice(coinId: string): Promise<number> {
    const { data } = await axios.get(`${API_BASE_URL}/coin-price/${coinId}`);
    return data.price;
  },

  async getExchanges(): Promise<Exchange[]> {
    const { data } = await axios.get(`${API_BASE_URL}/exchanges`);
    return data;
  },

  async getNews(): Promise<NewsItem[]> {
    const { data } = await axios.get(`${API_BASE_URL}/news`);
    return data;
  },

  async getMarketSentiment(): Promise<MarketSentiment> {
    const { data } = await axios.get(`${API_BASE_URL}/market-sentiment`);
    return data;
  },

  async getPortfolio(): Promise<Portfolio> {
    const { data } = await axios.get(`${API_BASE_URL}/portfolio`);
    return data;
  },
}; 