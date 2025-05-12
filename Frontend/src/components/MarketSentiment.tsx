import { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketSentiment {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export default function MarketSentiment() {
  const [sentiment, setSentiment] = useState<MarketSentiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const data = await cryptoApi.getMarketSentiment();
        setSentiment(data);
      } catch (err) {
        setError('Failed to fetch market sentiment data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();
  }, []);

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  if (error || !sentiment) {
    return (
      <div className='flex h-96 items-center justify-center text-destructive'>
        {error || 'Failed to load market sentiment data'}
      </div>
    );
  }

  const sentimentValue = parseInt(sentiment.value);
  const getSentimentColor = (value: number) => {
    if (value >= 75) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    if (value >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getSentimentIcon = (value: number) => {
    if (value >= 75) return <TrendingUp className='h-4 w-4 text-green-500' />;
    if (value >= 50) return <Minus className='h-4 w-4 text-yellow-500' />;
    if (value >= 25) return <Minus className='h-4 w-4 text-orange-500' />;
    return <TrendingDown className='h-4 w-4 text-red-500' />;
  };

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <h2 className='text-3xl font-bold'>Market Sentiment</h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <div className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>Fear & Greed Index</h3>
                  <p className='text-sm text-muted-foreground'>
                    Last updated: {new Date(sentiment.timestamp).toLocaleString()}
                  </p>
                </div>
                {getSentimentIcon(sentimentValue)}
              </div>

              <div className='mt-4 space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Value</span>
                  <span className={getSentimentColor(sentimentValue)}>{sentiment.value}</span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Classification</span>
                  <span className={getSentimentColor(sentimentValue)}>
                    {sentiment.value_classification}
                  </span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Next Update</span>
                  <span>{sentiment.time_until_update}</span>
                </div>
              </div>

              <div className='mt-4 text-xs text-muted-foreground'>
                <p>
                  The Fear & Greed Index measures market sentiment on a scale of 0-100. Extreme fear
                  can indicate buying opportunities, while extreme greed suggests a potential market
                  correction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
