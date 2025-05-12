import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function MarketHeatmap() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await cryptoApi.getMarketData();
        setMarketData(data);
      } catch (err) {
        setError('Failed to fetch market data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  if (error) {
    return <div className='flex h-96 items-center justify-center text-destructive'>{error}</div>;
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'bg-green-500/10 text-green-500';
    if (change < 0) return 'bg-red-500/10 text-red-500';
    return 'bg-gray-500/10 text-gray-500';
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className='h-4 w-4' />;
    if (change < 0) return <TrendingDown className='h-4 w-4' />;
    return <Minus className='h-4 w-4' />;
  };

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <h2 className='text-3xl font-bold'>Market Heatmap</h2>

          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
            {marketData.map((coin) => {
              const priceChange = coin.price_change_percentage_24h;
              const colorClass = getPriceChangeColor(priceChange);
              const icon = getPriceChangeIcon(priceChange);

              return (
                <div
                  key={coin.id}
                  className={`group relative overflow-hidden rounded-lg p-4 transition-all hover:shadow-lg ${colorClass}`}>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>{coin.symbol.toUpperCase()}</span>
                      <div className='flex items-center space-x-1'>
                        {icon}
                        <span className='text-sm'>{priceChange.toFixed(2)}%</span>
                      </div>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      ${coin.current_price.toLocaleString()}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      MC: ${(coin.market_cap / 1e9).toFixed(2)}B
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
