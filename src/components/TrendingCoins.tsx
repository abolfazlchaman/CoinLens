import React, { useState, useEffect } from 'react';

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    score: number;
    price_btc: number;
  };
}

const TrendingCoins: React.FC = () => {
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const data = await response.json();
        setTrending(data.coins);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
    const interval = setInterval(fetchTrending, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        <div className='space-y-3'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='h-16 bg-gray-200 dark:bg-gray-700 rounded'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
        🔥 Trending Coins
      </h2>
      <div className='space-y-4'>
        {trending.map((coin) => (
          <div
            key={coin.item.id}
            className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
            <div className='flex items-center space-x-3'>
              <img
                src={coin.item.thumb}
                alt={coin.item.name}
                className='w-8 h-8 rounded-full'
              />
              <div>
                <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                  {coin.item.name}
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Rank #{coin.item.market_cap_rank}
                </p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                {coin.item.price_btc.toFixed(8)} BTC
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Score: {coin.item.score.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;
