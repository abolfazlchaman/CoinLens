import React from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import type { TrendingCoin } from '../services/api';
import { cryptoService } from '../services/cryptoService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

const formatNumber = (num: number | undefined, decimals: number = 2): string => {
  if (typeof num !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export function TrendingCoins() {
  const {
    data: trending,
    isLoading,
    error,
    refetch,
  } = useCryptoData<TrendingCoin[]>('trending-coins', () => cryptoService.getTrendingCoins());

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
          🔥 Trending Coins
        </h2>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
          🔥 Trending Coins
        </h2>
        <div className='text-red-500 dark:text-red-400'>{error.message}</div>
        <button
          onClick={() => refetch()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!trending?.length) {
    return null;
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
        🔥 Trending Coins
      </h2>
      <div className='space-y-4'>
        {trending.map((coin) => (
          <div
            key={coin.id}
            className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center space-x-3'>
              <img
                src={coin.thumb}
                alt={coin.name}
                className='w-8 h-8 rounded-full'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-coin.png';
                }}
              />
              <div>
                <h3 className='text-sm font-medium text-gray-900 dark:text-white'>{coin.name}</h3>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Rank #{coin.market_cap_rank || 'N/A'}
                </p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                {formatNumber(coin.price_btc, 8)} BTC
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Score: {formatNumber(coin.score)}
              </p>
            </div>
          </div>
        ))}
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
