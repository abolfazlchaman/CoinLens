import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './theme-provider';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';

const navigation = [
  { name: 'Market Heatmap', href: '#market-heatmap' },
  { name: 'Top Exchanges', href: '#exchanges' },
  { name: 'Crypto News', href: '#crypto-news' },
  { name: 'Trading Coins', href: '#market-trends' },
  { name: 'Market Sentiment', href: '#market-sentiment' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Price Alerts', href: '#price-alerts' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className='fixed top-0 z-50 w-full bg-background shadow-sm'>
      <nav className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link
              to='/'
              className='text-2xl font-bold'>
              CoinLens
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-8'>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
                {item.name}
              </button>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
              {theme === 'dark' ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
            </button>

            {/* Language Selection Button - Temporarily Disabled
            <button
              onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
              className='rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
              <Globe className='h-5 w-5' />
            </button>
            */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden'>
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='fixed inset-0 top-16 z-50 bg-background md:hidden'>
            <div className='flex h-full flex-col space-y-4 p-4'>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className='w-full rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
