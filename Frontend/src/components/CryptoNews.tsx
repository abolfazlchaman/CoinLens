import React, { useState, useEffect } from 'react';
import { ExternalLink, Link, ArrowRight } from 'lucide-react';
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

const getRecentDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

const newsItems = [
  {
    title: 'Bitcoin Surges Past $50,000 as Institutional Adoption Grows',
    description:
      'Major financial institutions continue to show interest in Bitcoin, driving the price to new heights.',
    image:
      'https://images.unsplash.com/photo-1559526324-593bc073d938?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYWRlfGVufDB8fDB8fHwwauto=format&fit=crop&w=1169&q=80',
    date: getRecentDate(1),
    source: 'Crypto Daily',
  },
  {
    title: 'Ethereum 2.0 Upgrade Shows Promising Results',
    description:
      'The latest upgrade to Ethereum network demonstrates significant improvements in scalability and efficiency.',
    image:
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    date: getRecentDate(2),
    source: 'ETH News',
  },
  {
    title: 'New DeFi Protocol Launches with Revolutionary Features',
    description:
      'A groundbreaking DeFi platform introduces innovative yield farming mechanisms and enhanced security measures.',
    image:
      'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0b2NrJTIwdHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3Dauto=format&fit=crop&w=1169&q=80',
    date: getRecentDate(3),
    source: 'DeFi Times',
  },
  {
    title: 'Solana Network Achieves Record-Breaking Transaction Speed',
    description:
      'Solana blockchain demonstrates unprecedented performance, processing over 65,000 transactions per second.',
    image:
      'https://images.unsplash.com/photo-1660062993695-9c81acfaceeb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29sYW5hfGVufDB8fDB8fHwwauto=format&fit=crop&w=1169&q=80',
    date: getRecentDate(4),
    source: 'Blockchain Times',
  },
  {
    title: 'Major Bank Announces Crypto Custody Services',
    description:
      'Traditional financial institution enters the crypto space with secure custody solutions for institutional clients.',
    image:
      'https://images.unsplash.com/photo-1707761918029-1295034aa31e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9yZXh8ZW58MHx8MHx8fDA%3Dauto=format&fit=crop&w=1169&q=80',
    date: getRecentDate(5),
    source: 'Finance Daily',
  },
  {
    title: 'NFT Market Sees Surge in Digital Art Sales',
    description:
      'Digital art marketplace reports record-breaking sales as NFT adoption continues to grow across industries.',
    image:
      'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    date: getRecentDate(6),
    source: 'NFT Insider',
  },
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
    <div className='container mx-auto px-4 py-16'>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='text-3xl font-bold'>Latest Crypto News</h2>
        <Link
          to='/news'
          className='inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80'>
          View all news
          <ArrowRight className='ml-2 h-4 w-4' />
        </Link>
      </div>

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {newsItems.map((item, index) => (
          <div
            key={index}
            className='group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md'>
            <div className='aspect-video overflow-hidden'>
              <img
                src={item.image}
                alt={item.title}
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='p-6'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>{item.source}</span>
                <span className='text-sm text-muted-foreground'>{item.date}</span>
              </div>
              <h3 className='mb-2 text-xl font-semibold line-clamp-2'>{item.title}</h3>
              <p className='text-muted-foreground line-clamp-2'>{item.description}</p>
            </div>
          </div>
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
