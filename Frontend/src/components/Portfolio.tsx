import { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}

interface Portfolio {
  items: PortfolioItem[];
  totalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
}

export function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await cryptoApi.getPortfolio();
        setPortfolio(data);
      } catch (err) {
        setError('Failed to fetch portfolio data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className='w-full bg-muted/50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex h-96 items-center justify-center'>
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full bg-muted/50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex h-96 items-center justify-center text-destructive'>{error}</div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className='w-full bg-muted/50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex h-96 items-center justify-center text-muted-foreground'>
            No portfolio data available
          </div>
        </div>
      </div>
    );
  }

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className='h-4 w-4 text-green-500' />;
    if (change < 0) return <TrendingDown className='h-4 w-4 text-red-500' />;
    return <Minus className='h-4 w-4 text-muted-foreground' />;
  };

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold'>Portfolio</h2>
            <div className='text-right'>
              <p className='text-sm text-muted-foreground'>Total Value</p>
              <p className='text-2xl font-bold'>${portfolio.totalValue.toLocaleString()}</p>
              <p
                className={`text-sm ${
                  portfolio.totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                {portfolio.totalProfitLoss >= 0 ? '+' : ''}
                {portfolio.totalProfitLoss.toLocaleString()} (
                {portfolio.totalProfitLossPercentage.toFixed(2)}%)
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {portfolio.items.map((item) => {
              const profitLoss = item.amount * (item.purchasePrice - item.purchasePrice);
              const profitLossPercentage = (profitLoss / (item.amount * item.purchasePrice)) * 100;

              return (
                <div
                  key={item.id}
                  className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                        <span className='text-lg font-medium'>{item.symbol.toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 className='font-medium'>{item.name}</h3>
                        <p className='text-sm text-muted-foreground'>{item.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    {getPriceChangeIcon(profitLoss)}
                  </div>

                  <div className='mt-4 space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>Amount</span>
                      <span>{item.amount.toLocaleString()}</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>Purchase Price</span>
                      <span>${item.purchasePrice.toLocaleString()}</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>Purchase Date</span>
                      <span>{new Date(item.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>Profit/Loss</span>
                      <span className={profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {profitLoss >= 0 ? '+' : ''}
                        {profitLoss.toLocaleString()} ({profitLossPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  );
}
