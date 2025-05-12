import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80")',
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
        <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
          <div className='flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-500'>
            <CheckCircle2 className='h-4 w-4' />
            <span>100% Free</span>
          </div>
          <div className='flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-500'>
            <CheckCircle2 className='h-4 w-4' />
            <span>Real-time Data</span>
          </div>
          <div className='flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-500'>
            <CheckCircle2 className='h-4 w-4' />
            <span>100% Accurate</span>
          </div>
        </div>

        <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <Link
            to='/'
            onClick={() => {
              const element = document.querySelector('#market-heatmap');
              if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth',
                });
              }
            }}
            className='inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'>
            Latest changes
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
          <a
            href='https://www.coingecko.com/learn'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium text-dark transition-colors hover:bg-muted hover:text-muted-foreground'>
            Learn Trading from the best!
          </a>
        </div>
      </div>
    </div>
  );
}
