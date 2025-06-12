import { MarketData } from './coingecko.service';

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

export class PortfolioService {
  private static instance: PortfolioService;
  private portfolio: PortfolioItem[] = [];

  private constructor() {}

  public static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  public async getPortfolio(marketData: MarketData[]): Promise<Portfolio> {
    // In a real application, this would fetch from a database
    // For now, we'll use mock data
    this.portfolio = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        amount: 0.5,
        purchasePrice: 45000,
        purchaseDate: '2025-01-01T00:00:00.000Z',
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        amount: 2,
        purchasePrice: 2800,
        purchaseDate: '2025-02-01T00:00:00.000Z',
      },
    ];

    const totalValue = this.portfolio.reduce((sum, item) => {
      const currentPrice = marketData.find((coin) => coin.id === item.id)?.current_price || 0;
      return sum + item.amount * currentPrice;
    }, 0);

    const totalCost = this.portfolio.reduce((sum, item) => {
      return sum + item.amount * item.purchasePrice;
    }, 0);

    const totalProfitLoss = totalValue - totalCost;
    const totalProfitLossPercentage = (totalProfitLoss / totalCost) * 100;

    return {
      items: this.portfolio,
      totalValue,
      totalProfitLoss,
      totalProfitLossPercentage,
    };
  }

  public async addToPortfolio(item: Omit<PortfolioItem, 'purchaseDate'>): Promise<PortfolioItem> {
    const newItem: PortfolioItem = {
      ...item,
      purchaseDate: new Date().toISOString(),
    };
    this.portfolio.push(newItem);
    return newItem;
  }

  public async removeFromPortfolio(id: string): Promise<void> {
    this.portfolio = this.portfolio.filter((item) => item.id !== id);
  }

  public async updatePortfolioItem(
    id: string,
    updates: Partial<Omit<PortfolioItem, 'id' | 'purchaseDate'>>,
  ): Promise<PortfolioItem | null> {
    const index = this.portfolio.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.portfolio[index] = {
      ...this.portfolio[index],
      ...updates,
    };

    return this.portfolio[index];
  }
} 