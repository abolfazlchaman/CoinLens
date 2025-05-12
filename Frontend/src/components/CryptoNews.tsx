import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { cryptoApi } from '../services/cryptoApi';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  published_at: string;
  source: string;
  image_url?: string;
}

const unsplashImages = [
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
];

export function CryptoNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getNews();
        setNews(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <div className='text-red-500 dark:text-red-400'>{error}</div>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <div className='text-gray-500 dark:text-gray-400'>No news available</div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {news.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target='_blank'
          rel='noopener noreferrer'
          className='block rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-start space-x-4'>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className='w-24 h-24 object-cover rounded-lg'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-news.png';
                }}
              />
            )}
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                {item.title}
              </h3>
              <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                <span>{item.source}</span>
                <span>{new Date(item.published_at).toLocaleDateString()}</span>
              </div>
              <div className='mt-2 flex items-center text-blue-500 dark:text-blue-400'>
                <span className='text-sm'>Read more</span>
                <ExternalLink className='ml-1 h-4 w-4' />
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function CryptoNewsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CryptoNews />
    </ErrorBoundary>
  );
}
