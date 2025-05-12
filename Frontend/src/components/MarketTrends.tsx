import React, { useState, useEffect } from 'react';
import { cryptoApi, GlobalData } from '../services/api';

const MarketTrends: React.FC = () => {
  const [marketData, setMarketData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await cryptoApi.getGlobalData();
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='h-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500 dark:text-red-400'>{error || 'Failed to load market data'}</p>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>📊 Market Trends</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
            Total Market Cap
          </h3>
          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
            ${formatNumber(marketData.total_market_cap.usd)}
          </p>
          <div className='mt-2 flex items-center'>
            <span
              className={`text-sm ${
                marketData.market_cap_change_percentage_24h_usd >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
              {marketData.market_cap_change_percentage_24h_usd >= 0 ? '+' : ''}
              {marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%
            </span>
            <span className='text-xs text-gray-500 dark:text-gray-400 ml-2'>24h change</span>
          </div>
        </div>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
            24h Trading Volume
          </h3>
          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
            ${formatNumber(marketData.total_volume.usd)}
          </p>
        </div>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
            BTC Dominance
          </h3>
          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
            {marketData.market_cap_percentage.btc.toFixed(2)}%
          </p>
        </div>
        <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
            ETH Dominance
          </h3>
          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
            {marketData.market_cap_percentage.eth.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;
