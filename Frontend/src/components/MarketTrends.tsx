import { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import { ExternalLink } from 'lucide-react';

interface TrendingCoinItem {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  price_btc: number;
  score: number;
}

export default function MarketTrends() {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const data = await cryptoApi.getTrendingCoins();
        // Extract the item property from each trending coin
        const coins = data.map((coin) => coin.item);
        // Ensure all required properties exist before setting state
        const validCoins = coins.filter(
          (coin): coin is TrendingCoinItem =>
            coin &&
            typeof coin.id === 'string' &&
            typeof coin.symbol === 'string' &&
            typeof coin.name === 'string' &&
            typeof coin.market_cap_rank === 'number' &&
            typeof coin.thumb === 'string' &&
            typeof coin.small === 'string' &&
            typeof coin.large === 'string' &&
            typeof coin.price_btc === 'number' &&
            typeof coin.score === 'number',
        );
        setTrendingCoins(validCoins);
      } catch (err) {
        setError('Failed to fetch trending coins');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
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

  if (!trendingCoins.length) {
    return (
      <div className='flex h-96 items-center justify-center text-muted-foreground'>
        No trending coins available
      </div>
    );
  }

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <h2 className='text-3xl font-bold'>Trending Coins</h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {trendingCoins.map((coin) => (
              <div
                key={coin.id}
                className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <img
                      src={coin.thumb}
                      alt={coin.name}
                      className='h-10 w-10 rounded-full'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-coin.png';
                      }}
                    />
                    <div>
                      <h3 className='font-medium'>{coin.name}</h3>
                      <p className='text-sm text-muted-foreground'>{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <span className='text-sm text-muted-foreground'>#{coin.market_cap_rank}</span>
                </div>

                <div className='mt-4 space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Price (BTC)</span>
                    <span>{coin.price_btc.toFixed(8)}</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Score</span>
                    <span>{coin.score.toFixed(2)}</span>
                  </div>
                </div>

                <a
                  href={`https://www.coingecko.com/en/coins/${coin.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='absolute inset-0 z-10'>
                  <span className='sr-only'>View {coin.name} on CoinGecko</span>
                </a>
                <ExternalLink className='absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
