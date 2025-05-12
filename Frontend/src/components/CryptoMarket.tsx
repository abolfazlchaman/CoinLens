import React from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import type { MarketData } from '../services/cryptoApi';
import { cryptoApi } from '../services/cryptoApi';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';

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

export function CryptoMarket() {
  const {
    data: cryptos,
    isLoading,
    error,
    refetch,
  } = useCryptoData<MarketData[]>('market-data', () => cryptoApi.getMarketData());

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

  if (!cryptos?.length) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <div className='text-gray-500 dark:text-gray-400'>No cryptocurrencies found</div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {cryptos.slice(0, 6).map((crypto) => (
          <div
            key={crypto.id}
            className='rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md hover:shadow-lg transition-shadow'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <span className='text-sm text-gray-500 dark:text-gray-400 w-8'>
                  #{crypto.market_cap_rank || 'N/A'}
                </span>
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className='w-8 h-8 rounded-full'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-coin.png';
                  }}
                />
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {crypto.name}
                  </h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {crypto.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {formatNumber(crypto.current_price)}
                </p>
                <p
                  className={`text-sm font-medium ${
                    (crypto.price_change_percentage_24h ?? 0) >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </p>
              </div>
            </div>
          </div>
        ))}
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
