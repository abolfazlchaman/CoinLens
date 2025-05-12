import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeToggle } from './ui/theme-toggle';
import { LanguageToggle } from './ui/language-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navigation = [
  { name: 'Market Trends', href: '#market-trends' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Price Alerts', href: '#price-alerts' },
  { name: 'Market Sentiment', href: '#market-sentiment' },
  { name: 'Market Heatmap', href: '#market-heatmap' },
  { name: 'Crypto News', href: '#crypto-news' },
  { name: 'Exchanges', href: '#exchanges' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  useTheme();
  useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
      <nav className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center space-x-2 text-2xl font-bold text-primary'>
            <span>UltraDeal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-8'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className='text-sm font-medium text-foreground/80 transition-colors hover:text-foreground'>
                {item.name}
              </a>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <ThemeToggle />
            <LanguageToggle />

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='md:hidden'>
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-[300px] sm:w-[400px]'>
                <nav className='flex flex-col space-y-4'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className='text-sm font-medium text-foreground/80 transition-colors hover:text-foreground'>
                      {item.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
