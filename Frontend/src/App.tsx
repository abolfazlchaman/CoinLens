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
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider
      defaultTheme='dark'
      storageKey='crypto-man-theme'>
      <LanguageProvider>
        <div className='min-h-screen bg-background font-sans antialiased'>
          <Header />
          <main className='flex flex-col gap-16'>
            <Hero />
            <MarketHeatmap />
            <MarketTrends />
            {/* <Portfolio /> */}
            <PriceAlerts />
            <MarketSentiment />
            <CryptoNews />
            <Exchanges />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
