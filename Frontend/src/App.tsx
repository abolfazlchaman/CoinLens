import React from 'react';
import { ThemeProvider } from 'next-themes';
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

export default function App() {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem>
      <LanguageProvider>
        <div className='min-h-screen bg-background font-sans antialiased'>
          <Header />
          <main>
            <Hero />
            <section
              id='news'
              className='container py-8'>
              <CryptoNews />
            </section>
            <section
              id='exchanges'
              className='container py-8'>
              <Exchanges />
            </section>
            <section
              id='market-trends'
              className='container py-8'>
              <MarketTrends />
            </section>
            <section
              id='market-sentiment'
              className='container py-8'>
              <MarketSentiment />
            </section>
            <section
              id='market-heatmap'
              className='container py-8'>
              <MarketHeatmap />
            </section>
            <section
              id='portfolio'
              className='container py-8'>
              <Portfolio />
            </section>
            <section
              id='price-alerts'
              className='container py-8'>
              <PriceAlerts />
            </section>
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
