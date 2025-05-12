import React, { useState, useEffect } from 'react';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  description: string;
}

const CryptoNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 15 * 60 * 1000); // Update every 15 minutes
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='h-24 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        ))}
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

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>📰 Latest News</h2>
      <div className='space-y-4'>
        {news.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            className='block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
            <div className='flex justify-between items-start mb-2'>
              <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                {item.source}
              </span>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {formatDate(item.published_at)}
              </span>
            </div>
            <h3 className='text-base font-medium text-gray-900 dark:text-white mb-2'>
              {item.title}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
