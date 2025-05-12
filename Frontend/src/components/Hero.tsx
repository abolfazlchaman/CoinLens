import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-muted'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />

      {/* Content */}
      <div className='container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-32 text-center'>
        <h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-6xl'>
          Your Ultimate{' '}
          <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Crypto Companion
          </span>
        </h1>

        <p className='mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl'>
          Access{' '}
          <span className='font-semibold text-primary'>free and real-time accurate data</span> for
          all your cryptocurrency needs. Track market trends, manage your portfolio, and stay
          informed with the latest crypto news.
        </p>

        <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <Link
            to='/market-trends'
            className='inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'>
            Get Started
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
          <Link
            to='/learn'
            className='inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground'>
            Learn More
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className='mt-16 w-full max-w-5xl overflow-hidden rounded-lg border bg-card shadow-lg'>
          <img
            src='https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
            alt='Crypto trading dashboard'
            className='w-full'
          />
        </div>
      </div>
    </div>
  );
}
