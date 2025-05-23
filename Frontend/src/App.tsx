import { ThemeProvider } from './components/theme-provider';
import { LanguageProvider } from './contexts/LanguageContext';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import CryptoNews from './components/CryptoNews';
import Exchanges from './components/Exchanges';
import MarketTrends from './components/MarketTrends';
// import Portfolio from './components/Portfolio';
// import PriceAlerts from './components/PriceAlerts';
import MarketSentiment from './components/MarketSentiment';
import MarketHeatmap from './components/MarketHeatmap';
import Footer from './components/Footer';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import { Analytics } from '@vercel/analytics/react';

function Home() {
  return (
    <>
      <Hero />
      <main className='flex flex-col gap-16'>
        <section id='market-heatmap'>
          <MarketHeatmap />
        </section>
        <section id='market-trends'>
          <MarketTrends />
        </section>
        {/* <Portfolio /> */}
        {/* <PriceAlerts /> */}
        <section id='market-sentiment'>
          <MarketSentiment />
        </section>
        <section id='exchanges'>
          <Exchanges />
        </section>
        <section id='crypto-news'>
          <CryptoNews />
        </section>
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider
      defaultTheme='dark'
      storageKey='crypto-man-theme'>
      <LanguageProvider>
        <div className='min-h-screen bg-background font-sans antialiased'>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/faq'
              element={<FAQ />}
            />
            <Route
              path='/privacy'
              element={<Privacy />}
            />
            <Route
              path='/terms'
              element={<Terms />}
            />
            <Route
              path='/disclaimer'
              element={<Disclaimer />}
            />
          </Routes>
          <Footer />
          <Toaster
            richColors
            position='top-right'
          />
        </div>
      </LanguageProvider>
      <Analytics />
    </ThemeProvider>
  );
}
