import React, { useState, useEffect } from 'react';

interface Exchange {
  id: string;
  name: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  country: string;
}

const Exchanges: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=10');
        const data = await response.json();
        setExchanges(data);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
    const interval = setInterval(fetchExchanges, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const formatVolume = (volume: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(volume);
  };

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        <div className='space-y-4'>
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
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>💱 Top Exchanges</h2>
      <div className='space-y-4'>
        {exchanges.map((exchange) => (
          <div
            key={exchange.id}
            className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
            <div className='flex items-center space-x-3'>
              <img
                src={exchange.image}
                alt={exchange.name}
                className='w-8 h-8 rounded-full'
              />
              <div>
                <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                  {exchange.name}
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400'>{exchange.country}</p>
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm font-medium text-gray-900 dark:text-white'>
                {formatVolume(exchange.trade_volume_24h_btc)}
              </div>
              <div className='flex items-center space-x-1'>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    exchange.trust_score >= 8
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : exchange.trust_score >= 6
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                  Trust Score: {exchange.trust_score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
