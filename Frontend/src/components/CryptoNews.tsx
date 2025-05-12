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

function CryptoNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await cryptoApi.getNews();
        setNews(data);
      } catch (err) {
        setError('Failed to fetch news');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className='flex h-48 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  if (error) {
    return <div className='flex h-48 items-center justify-center text-destructive'>{error}</div>;
  }

  return (
    <div className='w-full bg-muted/50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>Latest Crypto News</h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {news.slice(0, 6).map((item) => (
              <a
                key={item.id}
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative overflow-hidden rounded-lg bg-card p-4 transition-all hover:shadow-lg'>
                <div className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <h3 className='line-clamp-2 text-sm font-medium'>{item.title}</h3>
                    <ExternalLink className='ml-2 h-4 w-4 flex-shrink-0 text-muted-foreground' />
                  </div>
                  <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <span>{item.source}</span>
                    <span>{new Date(item.published_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
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
