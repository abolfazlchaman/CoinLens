import React, { useState, useEffect } from 'react';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price_change_percentage_1h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
}

const MarketHeatmap: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d'>('24h');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false&price_change_percentage=1h,24h,7d',
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getChangePercentage = (coin: CoinData) => {
    switch (timeframe) {
      case '1h':
        return coin.price_change_percentage_1h;
      case '24h':
        return coin.price_change_percentage_24h;
      case '7d':
        return coin.price_change_percentage_7d;
      default:
        return coin.price_change_percentage_24h;
    }
  };

  const getColor = (change: number) => {
    const intensity = Math.min(Math.abs(change) / 10, 1);
    if (change >= 0) {
      return `rgba(34, 197, 94, ${intensity})`; // green
    }
    return `rgba(239, 68, 68, ${intensity})`; // red
  };

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='h-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>🔥 Market Heatmap</h2>
        <div className='flex space-x-2'>
          {(['1h', '24h', '7d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeframe === period
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}>
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {coins.map((coin) => {
          const change = getChangePercentage(coin);
          return (
            <div
              key={coin.id}
              className='p-3 rounded-lg transition-colors'
              style={{ backgroundColor: getColor(change) }}>
              <div className='flex flex-col'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-white'>
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      change >= 0 ? 'text-green-100' : 'text-red-100'
                    }`}>
                    {change >= 0 ? '+' : ''}
                    {change.toFixed(2)}%
                  </span>
                </div>
                <span className='text-xs text-white/80 mt-1'>{coin.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className='mt-4 flex items-center justify-center space-x-4'>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-green-500 rounded mr-2'></div>
          <span className='text-xs text-gray-600 dark:text-gray-400'>Gain</span>
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-red-500 rounded mr-2'></div>
          <span className='text-xs text-gray-600 dark:text-gray-400'>Loss</span>
        </div>
      </div>
    </div>
  );
};

export default MarketHeatmap;
