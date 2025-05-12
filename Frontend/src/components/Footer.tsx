import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <Link
              to='/'
              className='flex items-center space-x-2 text-2xl font-bold text-primary'>
              <span>UltraDeal</span>
            </Link>
            <p className='text-sm text-muted-foreground'>
              Your all-in-one platform for cryptocurrency market analysis, portfolio tracking, and
              real-time alerts.
            </p>
            <div className='flex gap-4'>
              <a
                href='https://github.com/yourusername/crypto-man'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary transition-colors'>
                <Github className='w-5 h-5' />
              </a>
              <a
                href='https://twitter.com/yourusername'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary transition-colors'>
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='https://linkedin.com/in/yourusername'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary transition-colors'>
                <Linkedin className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Market Data Links */}
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold'>Market Data</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='https://www.coingecko.com/en/trending'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
                  <span>Trending Coins</span>
                  <ExternalLink className='h-4 w-4' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/global'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
                  <span>Global Stats</span>
                  <ExternalLink className='h-4 w-4' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/exchanges'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
                  <span>Exchanges</span>
                  <ExternalLink className='h-4 w-4' />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold'>Resources</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='https://www.coingecko.com/en/learn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
                  <span>Learn Crypto</span>
                  <ExternalLink className='h-4 w-4' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/news'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
                  <span>Crypto News</span>
                  <ExternalLink className='h-4 w-4' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/glossary'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
                  <span>Glossary</span>
                  <ExternalLink className='h-4 w-4' />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/privacy'
                  className='text-sm text-muted-foreground hover:text-foreground'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to='/terms'
                  className='text-sm text-muted-foreground hover:text-foreground'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to='/disclaimer'
                  className='text-sm text-muted-foreground hover:text-foreground'>
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t pt-8 text-center text-sm text-muted-foreground'>
          <p>© {currentYear} UltraDeal. All rights reserved.</p>
          <p className='mt-2'>
            Powered by{' '}
            <a
              href='https://www.coingecko.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'>
              CoinGecko
            </a>
            . Data updates every 5 minutes.
          </p>
          <p className='mt-2'>
            Cryptocurrency data is provided for informational purposes only and should not be
            considered as financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
