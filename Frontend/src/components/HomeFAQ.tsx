import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is CoinLens?',
    answer:
      'CoinLens is a comprehensive cryptocurrency tracking platform that provides real-time market data, portfolio management tools, and market analysis features to help users make informed decisions in the crypto market.',
  },
  {
    question: 'How often is the data updated?',
    answer:
      'Our data is updated in real-time, with market prices and statistics refreshing every 5 minutes to ensure you have the most current information.',
  },
  {
    question: 'What features does CoinLens offer?',
    answer:
      'CoinLens offers real-time market data, portfolio tracking, price alerts, market sentiment analysis, heatmaps, and comprehensive news aggregation to keep you informed about the crypto market.',
  },
  {
    question: 'Is CoinLens free to use?',
    answer:
      'Yes, CoinLens is completely free to use. We believe in making cryptocurrency data accessible to everyone.',
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto space-y-8'>
          <div className='text-center space-y-4'>
            <h2 className='text-3xl font-bold'>Frequently Asked Questions</h2>
            <p className='text-lg text-muted-foreground'>
              Find quick answers to common questions about CoinLens
            </p>
          </div>

          <div className='space-y-4'>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className='card bg-base-100 shadow-md p-4 hover:shadow-2xl transition-all duration-300'>
                <div
                  className='card-body cursor-pointer'
                  onClick={() => toggleAccordion(index)}>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold'>{item.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {openIndex === index && (
                    <p className='mt-4 text-base-content/80'>{item.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='text-center'>
            <a
              href='/faq'
              className='btn btn-primary'>
              View All FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
