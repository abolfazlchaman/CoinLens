import React, { useState, useEffect } from 'react';

interface MarketCapData {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
  market_cap_rank: number;
}

const MarketCapDistribution: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketCapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=false',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        const data = await response.json();
        setMarketData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const calculateTotalMarketCap = () => {
    return marketData.reduce((total, coin) => total + coin.market_cap, 0);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        <div className='space-y-4'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='h-12 bg-gray-200 dark:bg-gray-700 rounded'></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500 dark:text-red-400'>{error}</p>
      </div>
    );
  }

  const totalMarketCap = calculateTotalMarketCap();

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
        📈 Market Cap Distribution
      </h2>
      <div className='space-y-4'>
        {marketData.map((coin) => {
          const percentage = (coin.market_cap / totalMarketCap) * 100;
          return (
            <div
              key={coin.id}
              className='space-y-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    #{coin.market_cap_rank}
                  </span>
                  <div>
                    <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                      {coin.name}
                    </h3>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-medium text-gray-900 dark:text-white'>
                    ${formatNumber(coin.market_cap)}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {percentage.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                <div
                  className='bg-blue-600 dark:bg-blue-500 h-2 rounded-full'
                  style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketCapDistribution;
