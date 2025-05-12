import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Exchange {
  id: string;
  name: string;
  country: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

export default function Exchanges() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const data = await cryptoApi.getExchanges();
        setExchanges(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
        setError('Failed to fetch exchanges');
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
    const interval = setInterval(fetchExchanges, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className='w-full animate-pulse'>
        <div className='h-64 bg-gray-200 dark:bg-gray-700 rounded-lg'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <p className='text-red-500 dark:text-red-400'>{error}</p>
      </div>
    );
  }

  return (
    <div className='w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
      <div className='flex items-center justify-between p-4 border-b dark:border-gray-700'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Top Exchanges</h2>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='hover:bg-gray-100 dark:hover:bg-gray-700'>
          {isCollapsed ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>
      {!isCollapsed && (
        <div className='p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {exchanges.map((exchange) => (
              <Card
                key={exchange.id}
                className='h-full'>
                <CardContent className='p-4'>
                  <div className='flex flex-col h-full'>
                    <h3 className='text-lg font-semibold mb-2 line-clamp-1'>{exchange.name}</h3>
                    <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                      <p className='flex justify-between'>
                        <span>Country:</span>
                        <span className='font-medium'>{exchange.country}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span>Trust Score:</span>
                        <span className='font-medium'>{exchange.trust_score}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span>24h Volume (BTC):</span>
                        <span className='font-medium'>
                          {exchange.trade_volume_24h_btc.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
