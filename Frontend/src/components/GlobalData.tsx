import React from 'react';
import type { GlobalData } from '../services/api';
import { useCryptoData } from '../hooks/useCryptoData';
import { cryptoService } from '../services/cryptoService';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';

const formatNumber = (num: number | undefined): string => {
  if (typeof num !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
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

export function GlobalData() {
  const {
    data: globalData,
    isLoading,
    error,
  } = useCryptoData<GlobalData>('global-data', () => cryptoService.getGlobalData());

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <div className='text-red-500 dark:text-red-400'>{error.message}</div>
      </div>
    );
  }

  if (!globalData) {
    return null;
  }

  const totalMarketCap = globalData.total_market_cap.usd;
  const totalVolume = globalData.total_volume.usd;
  const marketCapChange = globalData.market_cap_change_percentage_24h_usd;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Market Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Market Cap</h3>
          <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
            {formatNumber(totalMarketCap)}
          </p>
        </div>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>24h Volume</h3>
          <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
            {formatNumber(totalVolume)}
          </p>
        </div>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>24h Change</h3>
          <p
            className={`text-2xl font-bold mt-1 ${
              marketCapChange >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
            {formatPercentage(marketCapChange)}
          </p>
        </div>
      </div>
      <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
            Active Cryptocurrencies
          </h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {globalData.active_cryptocurrencies.toLocaleString()}
          </p>
        </div>
        <div className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Markets</h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {globalData.markets.toLocaleString()}
          </p>
        </div>
        <div className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Ongoing ICOs</h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {globalData.ongoing_icos}
          </p>
        </div>
        <div className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Upcoming ICOs</h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {globalData.upcoming_icos}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GlobalDataWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <GlobalData />
    </ErrorBoundary>
  );
}
