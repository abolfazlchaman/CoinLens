import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

interface MarketCapData {
  id: string;
  name: string;
  symbol: string;
  market_cap: number;
  market_cap_rank: number;
}

export function MarketCapDistribution() {
  const [marketData, setMarketData] = useState<MarketCapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getMarketData();
        setMarketData(
          data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            market_cap: coin.market_cap,
            market_cap_rank: coin.market_cap_rank,
          })),
        );
        setError(null);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to fetch market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <div className='text-red-500 dark:text-red-400'>{error}</div>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!marketData.length) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <p className='text-gray-500 dark:text-gray-400 text-center'>No market data available.</p>
      </div>
    );
  }

  const totalMarketCap = marketData.reduce((sum, coin) => sum + coin.market_cap, 0);
  const top10MarketCap = marketData
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 10)
    .reduce((sum, coin) => sum + coin.market_cap, 0);
  const restMarketCap = totalMarketCap - top10MarketCap;

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercentage = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / totalMarketCap);
  };

  return (
    <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
        Market Cap Distribution
      </h2>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-gray-900 dark:text-white'>Top 10 Coins</span>
          <div className='flex items-center space-x-4'>
            <div className='w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-500 rounded-full'
                style={{ width: `${(top10MarketCap / totalMarketCap) * 100}%` }}
              />
            </div>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {formatPercentage(top10MarketCap)}
            </span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-gray-900 dark:text-white'>Rest of Market</span>
          <div className='flex items-center space-x-4'>
            <div className='w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <div
                className='h-full bg-gray-400 rounded-full'
                style={{ width: `${(restMarketCap / totalMarketCap) * 100}%` }}
              />
            </div>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {formatPercentage(restMarketCap)}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
          Top 10 by Market Cap
        </h3>
        <div className='space-y-4'>
          {marketData
            .sort((a, b) => b.market_cap - a.market_cap)
            .slice(0, 10)
            .map((coin) => (
              <div
                key={coin.id}
                className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </span>
                <div className='flex items-center space-x-4'>
                  <div className='w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-500 rounded-full'
                      style={{ width: `${(coin.market_cap / totalMarketCap) * 100}%` }}
                    />
                  </div>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {formatPercentage(coin.market_cap)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketCapDistributionWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <MarketCapDistribution />
    </ErrorBoundary>
  );
}
