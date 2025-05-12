import React, { useState } from 'react';
import Header from './components/Header';
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

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleThemeToggle = () => setIsDarkMode((prev) => !prev);
  const handleLanguageChange = (lang: string) => setLanguage(lang);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Header />
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
      </main>
      <Footer />
    </div>
  );
};

export default App;
