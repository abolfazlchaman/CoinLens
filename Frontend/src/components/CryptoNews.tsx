import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { cryptoApi } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  description: string;
}

export default function CryptoNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await cryptoApi.getNews();
        setNews(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className='w-full animate-pulse'>
        <div className='h-64 bg-gray-200 dark:bg-gray-700 rounded-lg'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
        <p className='text-red-500 dark:text-red-400'>{error}</p>
      </div>
    );
  }

  return (
    <div className='w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
      <div className='flex items-center justify-between p-4 border-b dark:border-gray-700'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Latest News</h2>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='hover:bg-gray-100 dark:hover:bg-gray-700'>
          {isCollapsed ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>
      {!isCollapsed && (
        <div className='p-4'>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className='w-full'>
            {news.map((item) => (
              <SwiperSlide key={item.id}>
                <Card className='h-full'>
                  <CardContent className='p-4'>
                    <div className='flex flex-col h-full'>
                      <h3 className='text-lg font-semibold mb-2 line-clamp-2'>{item.title}</h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3'>
                        {item.description}
                      </p>
                      <div className='mt-auto'>
                        <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                          <span>{item.source}</span>
                          <span>{new Date(item.published_at).toLocaleDateString()}</span>
                        </div>
                        <a
                          href={item.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline'>
                          Read more
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
