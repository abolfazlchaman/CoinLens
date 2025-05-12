import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import CryptoList from './components/CryptoList';
import TrendingCoins from './components/TrendingCoins';
import CryptoNews from './components/CryptoNews';
import Exchanges from './components/Exchanges';
import MarketOverview from './components/MarketOverview';
import MarketTrends from './components/MarketTrends';
import MarketCapDistribution from './components/MarketCapDistribution';
import PriceAlerts from './components/PriceAlerts';
import Portfolio from './components/Portfolio';
import MarketSentiment from './components/MarketSentiment';
import MarketHeatmap from './components/MarketHeatmap';
import Footer from './components/Footer';
import CryptoMarketWithErrorBoundary from './components/CryptoMarket';
import GlobalDataWithErrorBoundary from './components/GlobalData';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useTheme } from './contexts/ThemeContext';
import { useLanguage } from './contexts/LanguageContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleThemeToggle = () => setIsDarkMode((prev) => !prev);
  const handleLanguageChange = (lang: string) => setLanguage(lang);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
          <Header
            isDarkMode={isDarkMode}
            onThemeToggle={handleThemeToggle}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
          <main className='container mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
              <div className='lg:col-span-3 space-y-8'>
                <MarketOverview />
                <MarketHeatmap />
                <MarketTrends />
                <MarketCapDistribution />
                <CryptoList />
                <PriceAlerts />
              </div>
              <div className='space-y-8'>
                <TrendingCoins />
                <CryptoNews />
                <Exchanges />
                <Portfolio />
                <MarketSentiment />
              </div>
            </div>
            <div className='mt-8 space-y-8'>
              <GlobalDataWithErrorBoundary />
              <CryptoMarketWithErrorBoundary />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
