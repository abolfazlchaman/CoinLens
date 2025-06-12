import { useState, useEffect } from 'react';
import { Link, ArrowRight } from 'lucide-react';
import { cryptoApi } from '../services/cryptoApi';
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
    image: '/images/news1.avif',
    date: getRecentDate(1),
    source: 'Crypto Daily',
  },
  {
    title: 'Ethereum 2.0 Upgrade Shows Promising Results',
    description:
      'The latest upgrade to Ethereum network demonstrates significant improvements in scalability and efficiency.',
    image: '/images/news2.avif',
    date: getRecentDate(2),
    source: 'ETH News',
  },
  {
    title: 'New DeFi Protocol Launches with Revolutionary Features',
    description:
      'A groundbreaking DeFi platform introduces innovative yield farming mechanisms and enhanced security measures.',
    image: '/images/news3.avif',
    date: getRecentDate(3),
    source: 'DeFi Times',
  },
  {
    title: 'Solana Network Achieves Record-Breaking Transaction Speed',
    description:
      'Solana blockchain demonstrates unprecedented performance, processing over 65,000 transactions per second.',
    image: '/images/news4.avif',
    date: getRecentDate(4),
    source: 'Blockchain Times',
  },
  {
    title: 'Major Bank Announces Crypto Custody Services',
    description:
      'Traditional financial institution enters the crypto space with secure custody solutions for institutional clients.',
    image: '/images/news5.avif',
    date: getRecentDate(5),
    source: 'Finance Daily',
  },
  {
    title: 'NFT Market Sees Surge in Digital Art Sales',
    description:
      'Digital art marketplace reports record-breaking sales as NFT adoption continues to grow across industries.',
    image: '/images/news6.avif',
    date: getRecentDate(6),
    source: 'NFT Insider',
  },
];

function CryptoNews() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
