import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url("/images/hero.avif")',
          filter: 'brightness(0.3)',
        }}
      />

      {/* Content */}
      <div className='container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-32 text-center'>
        <h1 className='mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl'>
          Your Ultimate{' '}
          <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Crypto Companion
          </span>
        </h1>

        <p className='mb-8 max-w-2xl text-lg text-white sm:text-xl'>
          Access{' '}
          <span className='font-semibold text-primary'>free and real-time accurate data</span> for
          all your cryptocurrency needs. Track market trends, manage your portfolio, and stay
          informed with the latest crypto news.
        </p>

        {/* Feature Badges */}
        <div className='mb-8 flex flex-wrap justify-center gap-4'>
          <div className='flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm'>
            <CheckCircle2 className='h-4 w-4 text-primary' />
            <span>Real-time Data</span>
          </div>
          <div className='flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm'>
            <CheckCircle2 className='h-4 w-4 text-primary' />
            <span>Portfolio Tracking</span>
          </div>
          <div className='flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm'>
            <CheckCircle2 className='h-4 w-4 text-primary' />
            <span>Price Alerts</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <Link
            to='#market-heatmap'
            className='inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
            Explore Market
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
          <Link
            to='/about'
            className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
