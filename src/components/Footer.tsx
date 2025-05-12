import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              About UltraDeal
            </h3>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              Your ultimate cryptocurrency tracking platform. Stay updated with real-time prices,
              market trends, and comprehensive crypto analytics.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='https://www.coingecko.com/en/api'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 dark:text-blue-400 hover:underline text-sm'>
                  CoinGecko API
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/coins/trending'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 dark:text-blue-400 hover:underline text-sm'>
                  Trending Coins
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/global'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 dark:text-blue-400 hover:underline text-sm'>
                  Global Stats
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Resources</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='https://www.coingecko.com/en/learn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 dark:text-blue-400 hover:underline text-sm'>
                  Learn Crypto
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/news'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 dark:text-blue-400 hover:underline text-sm'>
                  Crypto News
                </a>
              </li>
              <li>
                <a
                  href='https://www.coingecko.com/en/glossary'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 dark:text-blue-400 hover:underline text-sm'>
                  Crypto Glossary
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <p className='text-center text-gray-600 dark:text-gray-300 text-sm'>
            Powered by{' '}
            <a
              href='https://www.coingecko.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 dark:text-blue-400 hover:underline'>
              CoinGecko
            </a>
            {' • '}
            Data updates every 5 minutes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
