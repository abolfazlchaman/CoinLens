import type { MarketData, GlobalData, TrendingCoin, Exchange, NewsItem, CoinGeckoTrendingResponse } from './coingecko.service';

export class FallbackService {
  private static instance: FallbackService;

  private constructor() {}

  public static getInstance(): FallbackService {
    if (!FallbackService.instance) {
      FallbackService.instance = new FallbackService();
    }
    return FallbackService.instance;
  }

  public async getMarketData(): Promise<MarketData[]> {
    return [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: 50000,
        market_cap: 1000000000000,
        market_cap_rank: 1,
        total_volume: 50000000000,
        price_change_percentage_24h: 2.5,
        price_change_percentage_7d_in_currency: 5.0,
        price_change_percentage_1h_in_currency: 0.5,
        high_24h: 51000,
        low_24h: 49000,
        price_change_24h: 1250,
        market_cap_change_24h: 25000000000,
        market_cap_change_percentage_24h: 2.5,
        circulating_supply: 19500000,
        total_supply: 21000000,
        max_supply: 21000000,
        ath: 69000,
        ath_change_percentage: -27.5,
        ath_date: '2021-11-10T14:24:11.849Z',
        atl: 67.81,
        atl_change_percentage: 73630.0,
        atl_date: '2013-07-06T00:00:00.000Z',
        last_updated: new Date().toISOString()
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        current_price: 3000,
        market_cap: 350000000000,
        market_cap_rank: 2,
        total_volume: 30000000000,
        price_change_percentage_24h: 3.0,
        price_change_percentage_7d_in_currency: 7.0,
        price_change_percentage_1h_in_currency: 0.8,
        high_24h: 3100,
        low_24h: 2900,
        price_change_24h: 90,
        market_cap_change_24h: 10500000000,
        market_cap_change_percentage_24h: 3.0,
        circulating_supply: 120000000,
        total_supply: 120000000,
        max_supply: null,
        ath: 4865,
        ath_change_percentage: -38.3,
        ath_date: '2021-11-10T14:24:19.604Z',
        atl: 0.432979,
        atl_change_percentage: 692900.0,
        atl_date: '2015-10-20T00:00:00.000Z',
        last_updated: new Date().toISOString()
      },
    ];
  }

  public async getGlobalData(): Promise<GlobalData> {
    return {
      data: {
        total_market_cap: { usd: 2000000000000 },
        total_volume: { usd: 100000000000 },
        market_cap_percentage: { btc: 40, eth: 20 },
        market_cap_change_percentage_24h_usd: 2.5,
      },
    };
  }

  public async getTrendingCoins(): Promise<CoinGeckoTrendingResponse> {
    return {
      coins: [
        {
          item: {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'btc',
            market_cap_rank: 1,
            thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
            small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
            large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
            price_btc: 1,
            score: 0,
          },
        },
        {
          item: {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'eth',
            market_cap_rank: 2,
            thumb: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
            small: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
            large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
            price_btc: 0.06,
            score: 1,
          },
        },
      ],
    };
  }

  public async getCoinPrice(coinId: string): Promise<number> {
    const prices: { [key: string]: number } = {
      bitcoin: 50000,
      ethereum: 3000,
    };
    return prices[coinId] || 0;
  }

  public async getExchanges(): Promise<Exchange[]> {
    return [
      {
        id: 'binance',
        name: 'Binance',
        country: 'Cayman Islands',
        trust_score: 10,
        trade_volume_24h_btc: 1000000,
      },
      {
        id: 'okx',
        name: 'OKX',
        country: 'Malta',
        trust_score: 9,
        trade_volume_24h_btc: 500000,
      },
    ];
  }

  public async getNews(): Promise<NewsItem[]> {
    return [
      {
        id: '1',
        title: 'Latest Crypto News from CoinGecko',
        url: 'https://www.coingecko.com/en/news',
        source: 'CoinGecko',
        published_at: new Date().toISOString(),
        description: 'Visit CoinGecko News for the latest updates on cryptocurrency markets, trends, and developments.',
      },
      {
        id: '2',
        title: 'Crypto Market Analysis',
        url: 'https://www.coingecko.com/en/markets',
        source: 'CoinGecko',
        published_at: new Date().toISOString(),
        description: 'Check out CoinGecko Markets for real-time cryptocurrency prices, market caps, and trading volumes.',
      },
    ];
  }
}

export const fallbackService = FallbackService.getInstance(); 