import { BarChart3, Bell, LineChart, Newspaper, PieChart, TrendingUp } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: LineChart,
    title: 'Real-time Market Data',
    description:
      'Access up-to-the-minute cryptocurrency prices, market caps, and trading volumes from reliable sources.',
  },
  {
    icon: BarChart3,
    title: 'Market Analysis',
    description:
      'Comprehensive tools for analyzing market trends, including heatmaps and sentiment indicators.',
  },
  {
    icon: PieChart,
    title: 'Portfolio Tracking',
    description:
      'Monitor your cryptocurrency investments and track their performance over time with detailed analytics.',
  },
  {
    icon: Bell,
    title: 'Price Alerts',
    description:
      'Set custom price alerts for your favorite cryptocurrencies and never miss important market movements.',
  },
  {
    icon: TrendingUp,
    title: 'Market Trends',
    description: 'Stay ahead of the market with advanced trend analysis and predictive indicators.',
  },
  {
    icon: Newspaper,
    title: 'News Aggregation',
    description:
      'Stay informed with the latest cryptocurrency news and market updates from trusted sources.',
  },
];

export default function Features() {
  return (
    <section className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='text-3xl font-bold'>Powerful Features</h2>
            <p className='text-lg text-muted-foreground'>
              Everything you need to navigate the cryptocurrency market
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='card bg-base-100 shadow-md p-4 hover:shadow-2xl transition-all duration-300'>
                <div className='card-body'>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                    <feature.icon className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                  <p className='text-base-content/80'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
