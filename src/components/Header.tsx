import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface MarketStats {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
}

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [marketStats, setMarketStats] = React.useState<MarketStats | null>(null);

  React.useEffect(() => {
    const fetchMarketStats = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();
        setMarketStats(data.data);
      } catch (error) {
        console.error('Error fetching market stats:', error);
      }
    };

    fetchMarketStats();
    const interval = setInterval(fetchMarketStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>UltraDeal</h1>
            <div className='hidden md:flex items-center space-x-4 text-sm'>
              <span className='text-gray-600 dark:text-gray-300'>
                Market Cap:{' '}
                {marketStats ? formatNumber(marketStats.total_market_cap) : 'Loading...'}
              </span>
              <span className='text-gray-600 dark:text-gray-300'>
                24h Vol: {marketStats ? formatNumber(marketStats.total_volume) : 'Loading...'}
              </span>
              <span
                className={`text-sm ${
                  marketStats?.market_cap_change_percentage_24h || 0 >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
                24h Change:{' '}
                {marketStats
                  ? marketStats.market_cap_change_percentage_24h.toFixed(2) + '%'
                  : 'Loading...'}
              </span>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <button
              onClick={toggleTheme}
              className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
              {isDarkMode ? (
                <svg
                  className='w-5 h-5 text-yellow-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  className='w-5 h-5 text-gray-800'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
