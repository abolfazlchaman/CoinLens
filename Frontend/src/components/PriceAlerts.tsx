import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

interface Alert {
  id: string;
  coinId: string;
  coinSymbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  triggered: boolean;
}

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [availableCoins, setAvailableCoins] = useState<{ id: string; symbol: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await cryptoApi.getMarketData();
        setAvailableCoins(
          data.map((coin) => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
          })),
        );
        setError(null);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setError('Failed to fetch available coins');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleAddAlert = () => {
    if (!selectedCoin || !targetPrice) return;

    const coin = availableCoins.find((c) => c.id === selectedCoin);
    if (!coin) return;

    const newAlert: Alert = {
      id: Date.now().toString(),
      coinId: selectedCoin,
      coinSymbol: coin.symbol,
      targetPrice: parseFloat(targetPrice),
      condition,
      triggered: false,
    };

    setAlerts((prev) => [...prev, newAlert]);
    setSelectedCoin('');
    setTargetPrice('');
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

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
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Price Alerts</h2>
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
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <Select
              value={selectedCoin}
              onValueChange={setSelectedCoin}>
              <SelectTrigger className='w-full sm:w-[200px]'>
                <SelectValue placeholder='Select coin' />
              </SelectTrigger>
              <SelectContent>
                {availableCoins.map((coin) => (
                  <SelectItem
                    key={coin.id}
                    value={coin.id}>
                    {coin.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={condition}
              onValueChange={(value: 'above' | 'below') => setCondition(value)}>
              <SelectTrigger className='w-full sm:w-[120px]'>
                <SelectValue placeholder='Condition' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='above'>Above</SelectItem>
                <SelectItem value='below'>Below</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type='number'
              placeholder='Target price'
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className='w-full sm:w-[150px]'
            />

            <Button
              onClick={handleAddAlert}
              className='w-full sm:w-auto'>
              <Plus className='h-4 w-4 mr-2' />
              Add Alert
            </Button>
          </div>

          <div className='space-y-4'>
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                        {alert.coinSymbol}
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Alert when price goes {alert.condition} $
                        {alert.targetPrice.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleDeleteAlert(alert.id)}
                      className='text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
