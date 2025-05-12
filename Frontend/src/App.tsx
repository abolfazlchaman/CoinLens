import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CryptoNews from './components/CryptoNews';
import Exchanges from './components/Exchanges';
import MarketTrends from './components/MarketTrends';
import Portfolio from './components/Portfolio';
import PriceAlerts from './components/PriceAlerts';
import MarketSentiment from './components/MarketSentiment';
import MarketHeatmap from './components/MarketHeatmap';
import { TopCryptos } from './components/TopCryptos';

export default function App() {
  return (
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vite-ui-theme'>
      <LanguageProvider>
        <div className='min-h-screen bg-background font-sans antialiased'>
          <Header />
          <main className='container mx-auto px-4 py-8 space-y-8'>
            <Hero />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <TopCryptos />
              <MarketHeatmap />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <MarketTrends />
              <MarketSentiment />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <Portfolio />
              <PriceAlerts />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <CryptoNews />
              <Exchanges />
            </div>
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
