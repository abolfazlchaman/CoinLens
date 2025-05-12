import React from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import type { GlobalData } from '../services/api';
import { cryptoService } from '../services/cryptoService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const formatNumber = (num: number | undefined): string => {
  if (typeof num !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(num);
};

const formatPercentage = (num: number | undefined): string => {
  if (typeof num !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    signDisplay: 'always',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num / 100);
};

export function Header({ isDarkMode, onThemeToggle, language, onLanguageChange }: HeaderProps) {
  const {
    data: marketData,
    isLoading,
    error,
  } = useCryptoData<GlobalData>('global-data', () => cryptoService.getGlobalData());

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>CryptoMan</h1>
            <div className='flex items-center space-x-2'>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className='bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='en'>English</option>
                <option value='es'>Español</option>
                <option value='fr'>Français</option>
                <option value='de'>Deutsch</option>
                <option value='zh'>中文</option>
                <option value='ja'>日本語</option>
                <option value='ko'>한국어</option>
                <option value='ru'>Русский</option>
              </select>
              <button
                onClick={onThemeToggle}
                className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                {isDarkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>

          <div className='flex items-center space-x-6'>
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className='text-red-500 dark:text-red-400'>{error.message}</div>
            ) : (
              <>
                <div className='text-sm'>
                  <span className='text-gray-500 dark:text-gray-400'>Market Cap: </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {formatNumber(marketData?.total_market_cap?.usd)}
                  </span>
                </div>
                <div className='text-sm'>
                  <span className='text-gray-500 dark:text-gray-400'>24h Vol: </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {formatNumber(marketData?.total_volume?.usd)}
                  </span>
                </div>
                <div className='text-sm'>
                  <span className='text-gray-500 dark:text-gray-400'>BTC Dominance: </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {formatPercentage(marketData?.market_cap_percentage?.btc)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function HeaderWithErrorBoundary(props: HeaderProps) {
  return (
    <ErrorBoundary>
      <Header {...props} />
    </ErrorBoundary>
  );
}
