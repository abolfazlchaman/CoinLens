import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Button } from './ui/button';
import { ArrowUpDown } from 'lucide-react';
import { cryptoApi } from '../services/cryptoApi';

type SortField = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h' | 'market_cap';
type SortOrder = 'asc' | 'desc';

export function TopCryptos() {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('market_cap_rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getMarketData();
        setCryptos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to fetch cryptocurrency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatPercentage = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  };

  const filteredCryptos = cryptos
    .filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'market_cap_rank') {
        return (a[sortField] - b[sortField]) * modifier;
      }
      return (a[sortField] - b[sortField]) * modifier;
    });

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center py-8 text-red-500'>{error}</div>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Top 100 Cryptocurrencies</h2>
        <Input
          type='text'
          placeholder='Search cryptocurrencies...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-xs'
        />
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <Button
                  variant='ghost'
                  onClick={() => handleSort('current_price')}
                  className='flex items-center gap-1'>
                  Price
                  <ArrowUpDown className='h-4 w-4' />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant='ghost'
                  onClick={() => handleSort('price_change_percentage_24h')}
                  className='flex items-center gap-1'>
                  24h %
                  <ArrowUpDown className='h-4 w-4' />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant='ghost'
                  onClick={() => handleSort('market_cap')}
                  className='flex items-center gap-1'>
                  Market Cap
                  <ArrowUpDown className='h-4 w-4' />
                </Button>
              </TableHead>
              <TableHead>Volume (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCryptos.map((crypto) => (
              <TableRow key={crypto.id}>
                <TableCell>{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className='w-6 h-6'
                    />
                    <span>{crypto.name}</span>
                    <span className='text-muted-foreground'>{crypto.symbol.toUpperCase()}</span>
                  </div>
                </TableCell>
                <TableCell>{formatPrice(crypto.current_price)}</TableCell>
                <TableCell
                  className={
                    crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }>
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </TableCell>
                <TableCell>{formatPrice(crypto.market_cap)}</TableCell>
                <TableCell>{formatPrice(crypto.total_volume)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
