import React from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import type { GlobalData } from '../services/api';
import { cryptoService } from '../services/cryptoService';
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

export function MarketOverview() {
  const {
    data: marketData,
    isLoading,
    error,
    refetch,
  } = useCryptoData<GlobalData>('global-data', () => cryptoService.getGlobalData());

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

  if (!marketData) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
        <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Market Cap</h3>
        <p className='mt-2 text-2xl font-semibold text-gray-900 dark:text-white'>
          {formatNumber(marketData.total_market_cap?.usd)}
        </p>
        <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
          {formatPercentage(marketData.market_cap_change_percentage_24h_usd)}
        </p>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
        <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>24h Volume</h3>
        <p className='mt-2 text-2xl font-semibold text-gray-900 dark:text-white'>
          {formatNumber(marketData.total_volume?.usd)}
        </p>
        <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
          {formatPercentage(marketData.total_volume?.usd_24h_change)}
        </p>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
        <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
          Active Cryptocurrencies
        </h3>
        <p className='mt-2 text-2xl font-semibold text-gray-900 dark:text-white'>
          {marketData.active_cryptocurrencies}
        </p>
        <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
          {marketData.markets} Markets
        </p>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
        <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Market Dominance</h3>
        <p className='mt-2 text-2xl font-semibold text-gray-900 dark:text-white'>
          {formatPercentage(marketData.market_cap_percentage?.btc)} BTC
        </p>
        <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
          {formatPercentage(marketData.market_cap_percentage?.eth)} ETH
        </p>
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
