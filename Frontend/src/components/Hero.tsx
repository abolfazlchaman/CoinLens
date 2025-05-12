import React from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById('content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className='relative h-[60vh] min-h-[400px] w-full overflow-hidden'
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className='absolute inset-0 bg-black/50' />
      <div className='relative h-full flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
          <span className='font-display'>UltraDeal</span>
        </h1>
        <p className='text-xl md:text-2xl text-white/90 mb-8 max-w-2xl'>
          Your free, real-time cryptocurrency dashboard. Stay updated with the latest market trends,
          news, and insights.
        </p>
        <div className='flex flex-col sm:flex-row gap-4'>
          <Button
            size='lg'
            onClick={scrollToContent}
            className='bg-white text-black hover:bg-white/90'>
            Explore Dashboard
            <ArrowDown className='ml-2 h-4 w-4' />
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='text-white border-white hover:bg-white/10'>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
