import React, { useState, useEffect } from 'react';

interface SentimentData {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

const MarketSentiment: React.FC = () => {
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const response = await fetch('https://api.alternative.me/fng/?limit=1');
        const data = await response.json();
        setSentiment(data.data[0]);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();
    const interval = setInterval(fetchSentiment, 60 * 60 * 1000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (value: number) => {
    if (value >= 75) return 'text-green-600 dark:text-green-400';
    if (value >= 50) return 'text-yellow-600 dark:text-yellow-400';
    if (value >= 25) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSentimentEmoji = (value: number) => {
    if (value >= 75) return '😄';
    if (value >= 50) return '😊';
    if (value >= 25) return '😐';
    return '😢';
  };

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded'></div>
      </div>
    );
  }

  if (!sentiment) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
          📊 Market Sentiment
        </h2>
        <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-4'>
          Unable to fetch market sentiment data.
        </p>
      </div>
    );
  }

  const sentimentValue = parseInt(sentiment.value);

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
        📊 Market Sentiment
      </h2>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
              Fear & Greed Index
            </h3>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              Last updated: {new Date(sentiment.timestamp).toLocaleString()}
            </p>
          </div>
          <div className='text-3xl'>{getSentimentEmoji(sentimentValue)}</div>
        </div>
        <div className='relative pt-1'>
          <div className='flex mb-2 items-center justify-between'>
            <div>
              <span
                className={`text-xs font-semibold inline-block ${getSentimentColor(
                  sentimentValue,
                )}`}>
                {sentiment.value_classification}
              </span>
            </div>
            <div className='text-right'>
              <span className='text-xs font-semibold inline-block text-gray-600 dark:text-gray-400'>
                {sentiment.value}
              </span>
            </div>
          </div>
          <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700'>
            <div
              style={{ width: `${sentiment.value}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                sentimentValue >= 75
                  ? 'bg-green-500'
                  : sentimentValue >= 50
                  ? 'bg-yellow-500'
                  : sentimentValue >= 25
                  ? 'bg-orange-500'
                  : 'bg-red-500'
              }`}
            />
          </div>
        </div>
        <div className='text-xs text-gray-500 dark:text-gray-400'>
          <p>Next update in: {sentiment.time_until_update}</p>
          <p className='mt-2'>
            The Fear & Greed Index is a tool that measures market sentiment on a scale of 0-100.
            Extreme fear can indicate that investors are too worried, which could be a buying
            opportunity. Extreme greed suggests that the market is due for a correction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketSentiment;
