import React from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import { cryptoService } from '../services/cryptoService';
import type { MarketData } from '../services/api';
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

export function CryptoMarket() {
  const {
    data: marketData,
    isLoading,
    error,
    refetch,
  } = useCryptoData<MarketData[]>('market-data', () => cryptoService.getMarketData());

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
        <div className='text-red-500 dark:text-red-400'>{error.message}</div>
        <button
          onClick={() => refetch()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!marketData?.length) {
    return null;
  }

  const totalMarketCap = marketData.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
  const topGainers = marketData
    .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
    .slice(0, 3);
  const topLosers = marketData
    .sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0))
    .slice(0, 3);

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Market Cap</h3>
          <p className='mt-1 text-2xl font-semibold text-gray-900 dark:text-white'>
            {formatNumber(totalMarketCap)}
          </p>
        </div>
        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Top Gainers</h3>
          <div className='mt-1 space-y-1'>
            {topGainers.map((coin) => (
              <div
                key={coin.id}
                className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                  {coin.symbol.toUpperCase()}
                </span>
                <span className='text-sm font-medium text-green-600 dark:text-green-400'>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Top Losers</h3>
          <div className='mt-1 space-y-1'>
            {topLosers.map((coin) => (
              <div
                key={coin.id}
                className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                  {coin.symbol.toUpperCase()}
                </span>
                <span className='text-sm font-medium text-red-600 dark:text-red-400'>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Coins</h3>
          <p className='mt-1 text-2xl font-semibold text-gray-900 dark:text-white'>
            {marketData.length.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CryptoMarketWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CryptoMarket />
    </ErrorBoundary>
  );
}
