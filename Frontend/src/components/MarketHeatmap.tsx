import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from 'next-themes';

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function MarketHeatmap() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await cryptoApi.getMarketData();
        setMarketData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getColorClass = (percentage: number) => {
    if (percentage >= 5) return 'bg-green-500/20 text-green-700 dark:text-green-400';
    if (percentage >= 0) return 'bg-green-500/10 text-green-600 dark:text-green-500';
    if (percentage >= -5) return 'bg-red-500/10 text-red-600 dark:text-red-500';
    return 'bg-red-500/20 text-red-700 dark:text-red-400';
  };

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
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Market Heatmap</h2>
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
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2'>
            {marketData.map((coin) => (
              <Card
                key={coin.id}
                className='overflow-hidden'>
                <CardContent className='p-2'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='text-sm font-medium text-gray-900 dark:text-white mb-1'>
                      {coin.symbol.toUpperCase()}
                    </div>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getColorClass(
                        coin.price_change_percentage_24h,
                      )}`}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                      ${coin.current_price.toLocaleString()}
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
