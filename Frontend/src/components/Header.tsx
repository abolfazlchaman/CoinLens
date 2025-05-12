import React from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Moon, Sun, Globe } from 'lucide-react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 flex'>
          <a
            className='mr-6 flex items-center space-x-2'
            href='/'>
            <span className='font-display text-xl font-bold'>UltraDeal</span>
          </a>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <a
              href='#news'
              className='transition-colors hover:text-foreground/80'>
              News
            </a>
            <a
              href='#exchanges'
              className='transition-colors hover:text-foreground/80'>
              Exchanges
            </a>
            <a
              href='#market-trends'
              className='transition-colors hover:text-foreground/80'>
              Market Trends
            </a>
            <a
              href='#market-sentiment'
              className='transition-colors hover:text-foreground/80'>
              Market Sentiment
            </a>
            <a
              href='#market-heatmap'
              className='transition-colors hover:text-foreground/80'>
              Market Heatmap
            </a>
            <a
              href='#portfolio'
              className='transition-colors hover:text-foreground/80'>
              Portfolio
            </a>
            <a
              href='#price-alerts'
              className='transition-colors hover:text-foreground/80'>
              Price Alerts
            </a>
          </nav>
        </div>
        <div className='flex flex-1 items-center justify-end space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'>
                <Globe className='h-[1.2rem] w-[1.2rem]' />
                <span className='sr-only'>Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')}>Español</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('de')}>Deutsch</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('it')}>Italiano</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('pt')}>Português</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')}>Русский</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('zh')}>中文</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ja')}>日本語</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ko')}>한국어</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
