import React, { useState, useEffect } from 'react';
import { cryptoApi, TrendingCoin } from '../services/cryptoApi';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

interface TrendingCoinItem {
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

export function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getTrendingCoins();
        // Extract the item property from each trending coin
        const coins = data.map((coin) => coin.item);
        setTrendingCoins(coins);
        setError(null);
      } catch (err) {
        console.error('Error fetching trending coins:', err);
        setError('Failed to fetch trending coins. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
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

  if (!trendingCoins.length) {
    return (
      <div className='w-full bg-muted/50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex h-96 items-center justify-center text-muted-foreground'>
            No trending coins available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <h2 className='text-3xl font-bold'>Trending Coins</h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {trendingCoins.map((coin) => (
              <div
                key={coin.id}
                className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <img
                      src={coin.thumb}
                      alt={coin.name}
                      className='h-10 w-10 rounded-full'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-coin.png';
                      }}
                    />
                    <div>
                      <h3 className='font-medium'>{coin.name}</h3>
                      <p className='text-sm text-muted-foreground'>{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <span className='text-sm text-muted-foreground'>#{coin.market_cap_rank}</span>
                </div>

                <div className='mt-4 space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Price (BTC)</span>
                    <span>{coin.price_btc.toFixed(8)}</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Score</span>
                    <span>{coin.score.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrendingCoinsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <TrendingCoins />
    </ErrorBoundary>
  );
}
