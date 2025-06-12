import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Anon. Coinlens enjoyer',
    role: 'Crypto Trader',
    content:
      'CoinLens has become my go-to platform for tracking cryptocurrency markets. The real-time data and intuitive interface make it easy to stay informed and make informed decisions.',
    rating: 5,
  },
  {
    name: 'Anon. Coinlens enjoyer',
    role: 'Investment Analyst',
    content:
      'The market sentiment analysis and heatmap features are incredibly valuable. They provide insights that help me understand market trends and make better investment decisions.',
    rating: 5,
  },
  {
    name: 'Anon. Coinlens enjoyer',
    role: 'Crypto Enthusiast',
    content:
      'I love how CoinLens combines all the essential crypto tools in one place. The portfolio tracking and price alerts have been game-changers for my crypto journey.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='text-3xl font-bold'>What Our Users Say</h2>
            <p className='text-lg text-muted-foreground'>
              Join thousands of satisfied users who trust CoinLens for their cryptocurrency needs
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='card bg-base-100 shadow-md p-4 hover:shadow-2xl transition-all duration-300'>
                <div className='card-body'>
                  <div className='flex items-center space-x-1 mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='h-5 w-5 fill-primary text-primary'
                      />
                    ))}
                  </div>
                  <p className='text-base-content/80 mb-4'>{testimonial.content}</p>
                  <div>
                    <h3 className='font-semibold'>{testimonial.name}</h3>
                    <p className='text-sm text-muted-foreground'>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
