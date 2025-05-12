import { ThemeProvider } from './contexts/ThemeContext';
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
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className='min-h-screen bg-background text-foreground'>
          <Header />
          <main className='flex flex-col gap-8 px-4 py-8 md:px-8 lg:px-16'>
            <Hero />
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <MarketTrends />
              <Portfolio />
              <PriceAlerts />
              <MarketSentiment />
              <MarketHeatmap />
              <CryptoNews />
              <Exchanges />
            </div>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
