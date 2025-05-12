import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { cryptoApi } from '../services/cryptoApi';

interface Exchange {
  id: string;
  name: string;
  url: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
}

export default function Exchanges() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const data = await cryptoApi.getExchanges();
        setExchanges(data);
      } catch (err) {
        setError('Failed to fetch exchanges');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  if (error) {
    return <div className='flex h-96 items-center justify-center text-destructive'>{error}</div>;
  }

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold'>Top Exchanges</h2>
            <a
              href='https://www.coingecko.com/en/exchanges'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
              <span>View all exchanges</span>
              <ExternalLink className='h-4 w-4' />
            </a>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {exchanges.map((exchange) => (
              <a
                key={exchange.id}
                href={exchange.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center space-x-4 rounded-lg bg-card p-4 transition-all hover:shadow-lg'>
                <img
                  src={exchange.image}
                  alt={exchange.name}
                  className='h-12 w-12 rounded-full object-cover'
                />
                <div className='flex-1 space-y-1'>
                  <h3 className='font-semibold'>{exchange.name}</h3>
                  <div className='flex items-center justify-between text-sm text-muted-foreground'>
                    <span>Trust Score: {exchange.trust_score}</span>
                    <span>Rank: #{exchange.trust_score_rank}</span>
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    24h Volume: {exchange.trade_volume_24h_btc.toFixed(2)} BTC
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
