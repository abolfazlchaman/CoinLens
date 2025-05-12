import React, { useState, useMemo } from 'react';
import useCryptoData from '../hooks/useCryptoData';
import SearchBar from './SearchBar';
import LoadingSkeleton from './LoadingSkeleton';
import SparklineChart from './SparklineChart';
import SortDropdown, { SortOption } from './SortDropdown';
import RefreshButton from './RefreshButton';

const CryptoList: React.FC = () => {
  const { cryptos, loading, error, refetch } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rank');

  const filteredAndSortedCryptos = useMemo(() => {
    const filtered = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rank':
          return a.market_cap_rank - b.market_cap_rank;
        case 'price':
          return b.current_price - a.current_price;
        case 'change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [cryptos, searchTerm, sortBy]);

  if (loading && cryptos.length === 0) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div className='text-red-500 text-center p-4'>{error}</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between mb-6'>
        <div className='flex-1'>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <div className='flex items-center gap-4'>
          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
          />
          <RefreshButton
            onClick={refetch}
            isLoading={loading}
          />
        </div>
      </div>
      <div className='grid gap-4'>
        {filteredAndSortedCryptos.map((crypto) => (
          <div
            key={crypto.id}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <span className='text-sm text-gray-500 dark:text-gray-400 w-8'>
                  #{crypto.market_cap_rank}
                </span>
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className='w-8 h-8 rounded-full'
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
                  ${crypto.current_price.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className='mt-4 h-12'>
              <SparklineChart
                data={crypto.sparkline_in_7d.price}
                color={crypto.price_change_percentage_24h >= 0 ? '#10B981' : '#EF4444'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
