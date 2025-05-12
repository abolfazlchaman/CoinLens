import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className='relative isolate overflow-hidden bg-muted/50'>
      <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8'>
          <h1 className='mt-10 text-4xl font-bold tracking-tight sm:text-6xl'>
            Your Ultimate Crypto Companion
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Stay ahead of the market with real-time data, personalized alerts, and comprehensive
            analysis. Track your portfolio, monitor market trends, and make informed decisions.
          </p>
          <div className='mt-10 flex items-center gap-x-6'>
            <Link
              to='#market-trends'
              className='rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
              Get Started
              <ArrowRight className='ml-2 -mr-1 h-4 w-4 inline-block' />
            </Link>
            <Link
              to='#crypto-news'
              className='text-sm font-semibold leading-6 text-foreground hover:text-primary'>
              Learn more <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
        <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32'>
          <div className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'>
            <img
              src='https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
              alt='Crypto trading dashboard'
              className='w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
