import React, { useState, useEffect } from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import { cryptoService } from '../services/cryptoService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

interface Exchange {
  id: string;
  name: string;
  country: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

export function Exchanges() {
  const {
    data: exchanges,
    isLoading,
    error,
    refetch,
  } = useCryptoData<Exchange[]>('exchanges', () => cryptoService.getExchanges());

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <div className='text-red-500 dark:text-red-400'>{error.message}</div>
        <button
          onClick={() => refetch()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  if (!exchanges?.length) {
    return null;
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>💱 Top Exchanges</h2>
      <div className='space-y-4'>
        {exchanges.map((exchange) => (
          <div
            key={exchange.id}
            className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            <div>
              <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{exchange.name}</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>{exchange.country}</p>
            </div>
            <div className='text-right'>
              <p className='text-lg font-medium text-gray-900 dark:text-white'>
                ${(exchange.trade_volume_24h_btc * 50000).toLocaleString()}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Trust Score: {exchange.trust_score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExchangesWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Exchanges />
    </ErrorBoundary>
  );
}
