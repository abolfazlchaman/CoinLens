import React, { useState, useEffect } from 'react';

interface MarketData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
    active_cryptocurrencies: number;
    total_exchanges: number;
  };
}

const MarketOverview: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
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

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='h-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
          ))}
        </div>
      </div>
    );
  }

  if (!marketData) return null;

  const { data } = marketData;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
        📊 Market Overview
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='p-4 rounded-lg bg-gray-50 dark:bg-gray-700'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Market Cap</h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {formatNumber(data.total_market_cap.usd)}
          </p>
          <p
            className={`text-sm mt-1 ${
              data.market_cap_change_percentage_24h_usd >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
            {data.market_cap_change_percentage_24h_usd.toFixed(2)}% (24h)
          </p>
        </div>

        <div className='p-4 rounded-lg bg-gray-50 dark:bg-gray-700'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
            24h Trading Volume
          </h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {formatNumber(data.total_volume.usd)}
          </p>
        </div>

        <div className='p-4 rounded-lg bg-gray-50 dark:bg-gray-700'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
            Active Cryptocurrencies
          </h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {data.active_cryptocurrencies.toLocaleString()}
          </p>
        </div>

        <div className='p-4 rounded-lg bg-gray-50 dark:bg-gray-700'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Exchanges</h3>
          <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
            {data.total_exchanges.toLocaleString()}
          </p>
        </div>
      </div>

      <div className='mt-6'>
        <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-2'>
          Market Cap Distribution
        </h3>
        <div className='space-y-2'>
          {Object.entries(data.market_cap_percentage)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([coin, percentage]) => (
              <div
                key={coin}
                className='flex items-center'>
                <div className='w-24 text-sm text-gray-600 dark:text-gray-300'>
                  {coin.toUpperCase()}
                </div>
                <div className='flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-blue-500'
                    style={{ width: `${percentage}%` }}></div>
                </div>
                <div className='w-16 text-right text-sm text-gray-600 dark:text-gray-300'>
                  {percentage.toFixed(1)}%
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
