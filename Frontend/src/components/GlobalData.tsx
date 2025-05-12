import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import type { GlobalData as GlobalDataType } from '../services/cryptoApi';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

export function GlobalData() {
  const [globalData, setGlobalData] = useState<GlobalDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getGlobalData();
        setGlobalData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching global data:', err);
        setError('Failed to fetch global data');
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  if (loading) {
    return (
      <div className='w-full bg-muted/50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex h-96 items-center justify-center'>
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full bg-muted/50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex h-96 items-center justify-center text-destructive'>{error}</div>
        </div>
      </div>
    );
  }

  if (!globalData) {
    return (
      <div className='w-full bg-muted/50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex h-96 items-center justify-center text-muted-foreground'>
            No global data available
          </div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  };

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold'>Global Market Data</h2>
            <div className='text-right'>
              <p className='text-sm text-muted-foreground'>24h Change</p>
              <p
                className={`text-2xl font-bold ${
                  globalData.data.market_cap_change_percentage_24h_usd >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
                {globalData.data.market_cap_change_percentage_24h_usd >= 0 ? '+' : ''}
                {formatPercentage(globalData.data.market_cap_change_percentage_24h_usd)}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <div className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>Total Market Cap</h3>
                  <p className='mt-2 text-2xl font-bold'>
                    {formatNumber(globalData.data.total_market_cap.usd)}
                  </p>
                </div>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>24h Volume</h3>
                  <p className='mt-2 text-2xl font-bold'>
                    {formatNumber(globalData.data.total_volume.usd)}
                  </p>
                </div>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>BTC Dominance</h3>
                  <p className='mt-2 text-2xl font-bold'>
                    {formatPercentage(globalData.data.market_cap_percentage.btc)}
                  </p>
                </div>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg bg-card p-6 transition-all hover:shadow-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>ETH Dominance</h3>
                  <p className='mt-2 text-2xl font-bold'>
                    {formatPercentage(globalData.data.market_cap_percentage.eth)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GlobalDataWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <GlobalData />
    </ErrorBoundary>
  );
}
