import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from './theme-provider';

const navigation = [
  { name: 'Market Heatmap', href: '#market-heatmap' },
  { name: 'Market Trends', href: '#market-trends' },
  { name: 'Market Sentiment', href: '#market-sentiment' },
  { name: 'Exchanges', href: '#exchanges' },
  { name: 'News', href: '#crypto-news' },
];

const footerLinks = [
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Disclaimer', href: '/disclaimer' },
];

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    // If we're not on the home page, navigate to home page first
    if (location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
          <div className='hidden lg:flex lg:items-center lg:space-x-8'>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
                {item.name}
              </button>
            ))}
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
                {item.name}
              </Link>
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
              className='rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden'>
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='lg:hidden w-full min-h-screen'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className='block w-full px-3 py-2 text-left text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
                  {item.name}
                </button>
              ))}
              {footerLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleLinkClick}
                  className='block w-full px-3 py-2 text-left text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
