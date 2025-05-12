import React, { useState } from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import { cryptoService } from '../services/cryptoService';
import type { MarketData } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

const formatNumber = (num: number | undefined): string => {
  if (typeof num !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(num);
};

const formatPercentage = (num: number | undefined): string => {
  if (typeof num !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    signDisplay: 'always',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num / 100);
};

export function MarketHeatmap() {
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d'>('24h');
  const { data, isLoading, error, refetch } = useCryptoData<MarketData[]>('market-data', () =>
    cryptoService.getMarketData(),
  );

  const getPriceChange = (coin: MarketData) => {
    if (!coin) return 0;
    switch (timeframe) {
      case '1h':
        return coin.price_change_percentage_1h_in_currency || 0;
      case '24h':
        return coin.price_change_percentage_24h || 0;
      case '7d':
        return coin.price_change_percentage_7d_in_currency || 0;
      default:
        return 0;
    }
  };

  const getColor = (change: number) => {
    if (change > 5) return 'bg-green-500 dark:bg-green-600';
    if (change > 0) return 'bg-green-300 dark:bg-green-400';
    if (change > -5) return 'bg-red-300 dark:bg-red-400';
    return 'bg-red-500 dark:bg-red-600';
  };

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
        <div className='text-red-500 dark:text-red-400'>{error.message}</div>
        <button
          onClick={() => refetch()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
        <h2 className='text-xl font-bold text-gray-900 dark:text-white'>Market Heatmap</h2>
        <div className='flex space-x-2'>
          {(['1h', '24h', '7d'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                timeframe === tf
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}>
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {data.slice(0, 8).map((coin) => {
          const change = getPriceChange(coin);
          return (
            <div
              key={coin.id}
              className={`p-4 rounded-lg ${getColor(change)} transition-colors duration-200`}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className='w-6 h-6 rounded-full'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-coin.png';
                    }}
                  />
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
                <span
                  className={`font-medium ${
                    change >= 0
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                  {formatPercentage(change)}
                </span>
              </div>
              <div className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                {formatNumber(coin.current_price)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MarketHeatmapWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <MarketHeatmap />
    </ErrorBoundary>
  );
}
