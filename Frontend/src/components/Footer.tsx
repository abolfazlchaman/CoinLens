import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, ExternalLink, Mail, LucideIcon } from 'lucide-react';

interface BaseLink {
  name: string;
  href: string;
}

interface IconLink extends BaseLink {
  icon: LucideIcon;
}

type FooterLink = BaseLink | IconLink;

interface LinkGroup {
  title: string;
  links: FooterLink[];
}

const footerLinks: LinkGroup[] = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'GitHub', href: 'https://github.com/abolfazlchaman', icon: Github },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/abolfazlchaman', icon: Linkedin },
      { name: 'Email', href: 'mailto:contact@abolfazlchaman.com', icon: Mail },
    ],
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <Link
              to='/'
              className='flex items-center space-x-2 text-2xl font-bold text-primary'>
              <span>CoinLens</span>
            </Link>
            <p className='text-sm text-muted-foreground'>
              Your trusted companion in the world of cryptocurrency. Providing real-time market data
              and insights to help you make informed decisions.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div
              key={group.title}
              className='space-y-4'>
              <h3 className='text-sm font-semibold'>{group.title}</h3>
              <ul className='space-y-2'>
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className='flex items-center space-x-2 text-sm text-muted-foreground transition-colors hover:text-foreground'>
                      {'icon' in link && <link.icon className='h-4 w-4' />}
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t pt-8 text-center text-sm text-muted-foreground'>
          <p>© {currentYear} CoinLens. All rights reserved.</p>
          <p className='mt-2'>
            Powered by{' '}
            <a
              href='https://www.coingecko.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'>
              CoinGecko
            </a>
            . Data updates every 5 minutes.
          </p>
          <p className='mt-2'>
            Cryptocurrency data is provided for informational purposes only and should not be
            considered as financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
