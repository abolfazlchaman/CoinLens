import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface UseCryptoDataReturn {
  cryptos: CryptoData[];
  loading: boolean;
  error: string | null;
  lastUpdated: number;
  refetch: () => Promise<void>;
}

const useCryptoData = (): UseCryptoDataReturn => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h'
      );
      const data = await response.json();
      setCryptos(data);
      setLastUpdated(Date.now());
      setError(null);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Refetch every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { cryptos, loading, error, lastUpdated, refetch: fetchData };
};

export default useCryptoData; 