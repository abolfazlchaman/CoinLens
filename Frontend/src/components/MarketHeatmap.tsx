import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';

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

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <h2 className='text-3xl font-bold'>Market Heatmap</h2>

          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
            {marketData.map((coin) => {
              const priceChange = coin.price_change_percentage_24h;
              const isPositive = priceChange > 0;
              const isNegative = priceChange < 0;

              return (
                <div
                  key={coin.id}
                  className={`group relative overflow-hidden rounded-lg bg-card p-4 transition-all hover:shadow-lg ${
                    isPositive ? 'hover:bg-green-500/10' : isNegative ? 'hover:bg-red-500/10' : ''
                  }`}>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>{coin.symbol.toUpperCase()}</span>
                      <span
                        className={`text-sm ${
                          isPositive
                            ? 'text-green-500'
                            : isNegative
                            ? 'text-red-500'
                            : 'text-muted-foreground'
                        }`}>
                        {priceChange.toFixed(2)}%
                      </span>
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
