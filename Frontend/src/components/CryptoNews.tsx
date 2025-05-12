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
  description: string;
  image_url?: string;
}

const unsplashImages = [
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
        setNews(data.slice(0, 3)); // Only show 3 news items
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
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold'>Latest Crypto News</h2>
            <a
              href='https://www.coingecko.com/en/news'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
              <span>View all news</span>
              <ExternalLink className='h-4 w-4' />
            </a>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
            {news.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative overflow-hidden rounded-lg bg-card transition-all hover:shadow-lg'>
                <div className='aspect-video w-full overflow-hidden'>
                  <img
                    src={unsplashImages[index % unsplashImages.length]}
                    alt={item.title}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='mb-2 line-clamp-2 font-medium'>{item.title}</h3>
                  <p className='line-clamp-2 text-sm text-muted-foreground'>{item.description}</p>
                  <div className='mt-4 flex items-center justify-between text-sm text-muted-foreground'>
                    <span>{new Date(item.published_at).toLocaleDateString()}</span>
                    <span>{item.source}</span>
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
