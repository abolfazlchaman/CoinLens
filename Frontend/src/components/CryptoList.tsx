import React, { useState, useMemo } from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import SearchBar from './SearchBar';
import SparklineChart from './SparklineChart';
import SortDropdown, { SortOption } from './SortDropdown';
import type { MarketData } from '../services/api';
import RefreshButton from './RefreshButton';
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

export function CryptoList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('rank');

  const {
    data: cryptos,
    isLoading,
    error,
    refetch,
  } = useCryptoData<MarketData[]>('market-data', () => cryptoService.getMarketData());

  const filteredAndSortedCryptos = useMemo(() => {
    const filtered =
      cryptos?.filter(
        (crypto: MarketData) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || [];

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'rank':
          return (a.market_cap_rank || 0) - (b.market_cap_rank || 0);
        case 'price':
          return (b.current_price || 0) - (a.current_price || 0);
        case 'change':
          return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [cryptos, searchTerm, sortOption]);

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
    return null;
  }

  return (
    <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
      <div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Cryptocurrency List</h2>
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <SortDropdown
            value={sortOption}
            onChange={setSortOption}
          />
          <RefreshButton
            onClick={refetch}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className='grid gap-4'>
        {filteredAndSortedCryptos.map((crypto) => (
          <div
            key={crypto.id}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700'>
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
            {crypto.sparkline_in_7d?.price && (
              <div className='mt-4 h-12'>
                <SparklineChart
                  data={crypto.sparkline_in_7d.price}
                  color={(crypto.price_change_percentage_24h ?? 0) >= 0 ? '#10B981' : '#EF4444'}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CryptoListWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CryptoList />
    </ErrorBoundary>
  );
}
