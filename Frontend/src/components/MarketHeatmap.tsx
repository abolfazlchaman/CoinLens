import React, { useState, useEffect, useRef } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import { TrendingUp, TrendingDown, Minus, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useTheme } from 'next-themes';

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function MarketHeatmap() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const heatmapRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await cryptoApi.getMarketData();
        setMarketData(data);
      } catch (err) {
        setError('Failed to fetch market data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const handleDownload = async () => {
    if (!heatmapRef.current) return;

    setIsDownloading(true);
    try {
      // Create a temporary container for the capture
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#ffffff';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.width = '1920px'; // Standard width for good quality
      container.style.height = 'auto';
      container.style.minHeight = '1080px';

      // Create navbar watermark
      const navbar = document.createElement('div');
      navbar.style.width = '100%';
      navbar.style.padding = '1rem 2rem';
      navbar.style.backgroundColor =
        theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
      navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      navbar.style.display = 'flex';
      navbar.style.justifyContent = 'space-between';
      navbar.style.alignItems = 'center';
      navbar.style.color = theme === 'dark' ? '#ffffff' : '#000000';
      navbar.style.fontSize = '0.875rem';

      const poweredBy = document.createElement('span');
      poweredBy.textContent = 'Powered by coinlens.info';
      const timestamp = document.createElement('span');
      timestamp.textContent = new Date().toLocaleString();

      navbar.appendChild(poweredBy);
      navbar.appendChild(timestamp);

      // Create content container
      const contentContainer = document.createElement('div');
      contentContainer.style.flex = '1';
      contentContainer.style.padding = '2rem';
      contentContainer.style.display = 'flex';
      contentContainer.style.flexDirection = 'column';
      contentContainer.style.gap = '1.5rem';

      // Clone the heatmap content
      const heatmapClone = heatmapRef.current.cloneNode(true) as HTMLElement;
      heatmapClone.style.width = '100%';
      heatmapClone.style.height = 'auto';
      heatmapClone.style.display = 'grid';
      heatmapClone.style.gridTemplateColumns = 'repeat(auto-fill, minmax(240px, 1fr))';
      heatmapClone.style.gap = '1rem';
      heatmapClone.style.alignItems = 'stretch';

      // Assemble the container
      contentContainer.appendChild(heatmapClone);
      container.appendChild(navbar);
      container.appendChild(contentContainer);
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2, // Higher quality
        width: 1920,
        height: container.offsetHeight,
        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
        logging: false,
        useCORS: true,
      });

      // Clean up
      document.body.removeChild(container);

      const link = document.createElement('a');
      link.download = `coinlens.info-market-heatmap-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to download heatmap:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  if (error) {
    return <div className='flex h-96 items-center justify-center text-destructive'>{error}</div>;
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'bg-green-500/10 text-green-500';
    if (change < 0) return 'bg-red-500/10 text-red-500';
    return 'bg-gray-500/10 text-gray-500';
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className='h-4 w-4' />;
    if (change < 0) return <TrendingDown className='h-4 w-4' />;
    return <Minus className='h-4 w-4' />;
  };

  return (
    <div className='w-full bg-muted/50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold'>Market Heatmap</h2>
            <button
              className='btn btn-primary gap-2 flex flex-row'
              onClick={handleDownload}
              disabled={isDownloading}>
              <Download className='h-4 w-4' />
              {isDownloading ? 'Downloading...' : '4K Heatmap Picture'}
            </button>
          </div>

          <div
            ref={heatmapRef}
            className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
            {marketData.map((coin) => {
              const priceChange = coin.price_change_percentage_24h;
              const colorClass = getPriceChangeColor(priceChange);
              const icon = getPriceChangeIcon(priceChange);

              return (
                <div
                  key={coin.id}
                  className={`group relative overflow-hidden rounded-lg p-4 transition-all hover:shadow-lg ${colorClass}`}>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>{coin.symbol.toUpperCase()}</span>
                      <div className='flex items-center space-x-1'>
                        {icon}
                        <span className='text-sm'>{priceChange.toFixed(2)}%</span>
                      </div>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      ${coin.current_price.toLocaleString()}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      MC: ${(coin.market_cap / 1e9).toFixed(2)}B
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
