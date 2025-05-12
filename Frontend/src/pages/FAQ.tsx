import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

// const faqItems: FAQItem[] = [
//   {
//     question: 'What is CoinLens?',
//     answer: 'CoinLens is a comprehensive cryptocurrency tracking platform that provides real-time market data, portfolio management tools, and market analysis features to help users make informed decisions in the crypto market.'
//   },
//   {
//     question: 'Is CoinLens free to use?',
//     answer: 'Yes, CoinLens is completely free to use. We believe in making cryptocurrency data accessible to everyone.'
//   },
//   {
//     question: 'How often is the data updated?',
//     answer: 'Our data is updated in real-time, with market prices and statistics refreshing every 5 minutes to ensure you have the most current information.'
//   },
//   {
//     question: 'Do I need to create an account?',
//     answer: 'While you can browse basic market data without an account, creating an account allows you to access additional features like portfolio tracking and price alerts.'
//   },
//   {
//     question: 'How accurate is the data?',
//     answer: 'We source our data from reliable providers and exchanges, ensuring high accuracy. However, we recommend cross-referencing with other sources for critical financial decisions.'
//   },
//   {
//     question: 'Can I track my portfolio?',
//     answer: 'Yes, registered users can create and track multiple portfolios, monitor their performance, and receive updates on their holdings.'
//   },
//   {
//     question: 'What cryptocurrencies are supported?',
//     answer: 'We support thousands of cryptocurrencies, including major coins like Bitcoin and Ethereum, as well as smaller altcoins and tokens.'
//   },
//   {
//     question: 'How do price alerts work?',
//     answer: 'You can set up price alerts for any cryptocurrency. When the price reaches your target, you'll receive a notification via email or browser notification.'
//   },
//   {
//     question: 'Is my data secure?',
//     answer: 'Yes, we take security seriously. All data is encrypted, and we never store sensitive financial information.'
//   },
//   {
//     question: 'Can I use CoinLens on mobile?',
//     answer: 'Yes, CoinLens is fully responsive and works on all devices, including smartphones and tablets.'
//   },
//   {
//     question: 'How do I report an issue?',
//     answer: 'You can report issues through our contact form or email us directly at contact@abolfazlchaman.com.'
//   },
//   {
//     question: 'What is the Market Heatmap?',
//     answer: 'The Market Heatmap provides a visual representation of market performance, showing which cryptocurrencies are gaining or losing value.'
//   },
//   {
//     question: 'How do I interpret the Market Sentiment?',
//     answer: 'Market Sentiment combines various indicators to show the overall market mood, helping you understand market trends and potential movements.'
//   },
//   {
//     question: 'Can I export my data?',
//     answer: 'Yes, you can export your portfolio data and market information in various formats for your records.'
//   },
//   {
//     question: 'What are the trading fees?',
//     answer: 'CoinLens is a data platform and doesn't charge trading fees. Any fees would be from the exchanges you use for actual trading.'
//   },
//   {
//     question: 'How do I stay updated with crypto news?',
//     answer: 'Our platform aggregates news from reliable sources, and you can customize your news feed based on your interests.'
//   },
//   {
//     question: 'What is the difference between market cap and volume?',
//     answer: 'Market cap is the total value of all coins in circulation, while volume represents the total amount of trading activity in a given period.'
//   },
//   {
//     question: 'How do I set up price alerts?',
//     answer: 'Navigate to the price alerts section, select your desired cryptocurrency, and set your target price. You will receive notifications when the price is reached.'
//   },
//   {
//     question: 'Can I use CoinLens for technical analysis?',
//     answer: 'Yes, we provide various technical indicators and charting tools to help with your analysis.'
//   },
//   {
//     question: 'How do I contact support?',
//     answer: 'You can reach our support team through the contact form on our website or email us at contact@abolfazlchaman.com.'
//   }
// ];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='container mx-auto px-4 py-24'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold'>Frequently Asked Questions</h1>
          <p className='text-lg text-muted-foreground'>
            Find answers to common questions about CoinLens
          </p>
        </div>

        {/* <div className='space-y-4'>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className='border rounded-lg overflow-hidden'>
              <button
                onClick={() => toggleAccordion(index)}
                className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors'>
                <span className='font-medium'>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className='px-6 py-4 bg-muted/50'>
                  <p className='text-muted-foreground'>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
