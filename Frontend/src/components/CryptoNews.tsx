import React from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import { cryptoService } from '../services/cryptoService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  description: string;
}

export function CryptoNews() {
  const {
    data: news,
    isLoading,
    error,
    refetch,
  } = useCryptoData<NewsItem[]>('news', () => cryptoService.getNews());

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <div className='text-red-500 dark:text-red-400'>{error.message}</div>
        <button
          onClick={() => refetch()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!news?.length) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

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
}

export default function CryptoNewsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CryptoNews />
    </ErrorBoundary>
  );
}
