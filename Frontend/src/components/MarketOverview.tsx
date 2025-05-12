import React from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import type { GlobalData } from '../services/cryptoApi';
import { cryptoApi } from '../services/cryptoApi';
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 100);
};

export function MarketOverview() {
  const {
    data: globalData,
    isLoading,
    error,
    refetch,
  } = useCryptoData<GlobalData>('global-data', () => cryptoApi.getGlobalData());

  if (isLoading) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <div className='text-red-500 dark:text-red-400'>{error.message}</div>
        <button
          onClick={() => refetch()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!globalData) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <p className='text-gray-500 dark:text-gray-400 text-center'>No market data available.</p>
      </div>
    );
  }

  const { data } = globalData;

  return (
    <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Market Overview</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Market Cap</h3>
          <p className='mt-1 text-lg font-semibold text-gray-900 dark:text-white'>
            {formatNumber(data.total_market_cap.usd)}
          </p>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            24h Change: {formatPercentage(data.market_cap_change_percentage_24h_usd)}
          </p>
        </div>

        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>24h Volume</h3>
          <p className='mt-1 text-lg font-semibold text-gray-900 dark:text-white'>
            {formatNumber(data.total_volume.usd)}
          </p>
        </div>
      </div>

      <div className='mt-6'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>Market Dominance</h3>
        <div className='space-y-4'>
          {Object.entries(data.market_cap_percentage)
            .sort(([, a], [, b]) => b - a)
            .map(([coin, percentage]) => (
              <div
                key={coin}
                className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                  {coin.toUpperCase()}
                </span>
                <div className='flex items-center space-x-4'>
                  <div className='w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-500 rounded-full'
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {percentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketOverviewWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <MarketOverview />
    </ErrorBoundary>
  );
}
