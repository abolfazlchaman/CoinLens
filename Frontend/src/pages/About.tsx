import { Github, Mail, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className='container mx-auto px-4 py-24'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold'>About CoinLens</h1>
          <p className='text-lg text-muted-foreground'>
            Empowering crypto enthusiasts with real-time market insights
          </p>
        </div>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Our Mission</h2>
          <p className='text-lg'>
            CoinLens was created with a simple yet powerful mission: to make cryptocurrency market
            data accessible, understandable, and actionable for everyone. We believe that informed
            decisions lead to better outcomes, and our platform provides the tools and insights
            needed to navigate the complex world of cryptocurrency markets.
          </p>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold'>The Developer</h2>
          <div className='bg-muted/50 rounded-lg p-6 space-y-4'>
            <div className='flex items-center space-x-4'>
              <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
                <span className='text-2xl font-bold text-primary'>AC</span>
              </div>
              <div>
                <h3 className='text-xl font-semibold'>Abolfazl Chaman</h3>
                <p className='text-muted-foreground'>Full Stack Developer</p>
              </div>
            </div>
            <p className='text-lg'>
              As a passionate developer with expertise in modern web technologies, I created
              CoinLens to combine my interest in cryptocurrency markets with my love for building
              user-friendly applications. My goal is to provide a platform that helps users make
              informed decisions in the crypto space.
            </p>
            <div className='flex flex-wrap gap-4'>
              <a
                href='https://abolfazlchaman.com/en'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors'>
                <Globe className='w-5 h-5' />
                <span>Creator's Website</span>
              </a>
              <a
                href='https://github.com/abolfazlchaman/coinlens'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors'>
                <Github className='w-5 h-5' />
                <span>GitHub</span>
              </a>
              <a
                href='mailto:contact@coinlens.info'
                className='flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors'>
                <Mail className='w-5 h-5' />
                <span>Email</span>
              </a>
            </div>
          </div>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Key Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-muted/50 rounded-lg p-6 space-y-2'>
              <h3 className='text-lg font-semibold'>Real-time Market Data</h3>
              <p className='text-muted-foreground'>
                Access up-to-the-minute cryptocurrency prices, market caps, and trading volumes.
              </p>
            </div>
            <div className='bg-muted/50 rounded-lg p-6 space-y-2'>
              <h3 className='text-lg font-semibold'>Market Analysis</h3>
              <p className='text-muted-foreground'>
                Comprehensive tools for analyzing market trends and making informed decisions.
              </p>
            </div>
            <div className='bg-muted/50 rounded-lg p-6 space-y-2'>
              <h3 className='text-lg font-semibold'>Portfolio Tracking</h3>
              <p className='text-muted-foreground'>
                Monitor your cryptocurrency investments and track their performance over time.
              </p>
            </div>
            <div className='bg-muted/50 rounded-lg p-6 space-y-2'>
              <h3 className='text-lg font-semibold'>News Aggregation</h3>
              <p className='text-muted-foreground'>
                Stay informed with the latest cryptocurrency news and market updates.
              </p>
            </div>
          </div>
        </section>

        <section className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Get in Touch</h2>
          <p className='text-lg'>
            Have questions, suggestions, or feedback? We'd love to hear from you! Feel free to reach
            out through any of the contact methods above.
          </p>
        </section>
      </div>
    </div>
  );
}
