import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/api';

interface Alert {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isTriggered: boolean;
}

const PriceAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [coins, setCoins] = useState<Array<{ id: string; name: string; symbol: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await cryptoApi.getMarketData();
        setCoins(
          data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
          })),
        );
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleAddAlert = () => {
    if (!selectedCoin || !targetPrice) return;

    const coin = coins.find((c) => c.id === selectedCoin);
    if (!coin) return;

    const newAlert: Alert = {
      id: Date.now().toString(),
      coinId: coin.id,
      coinName: coin.name,
      coinSymbol: coin.symbol,
      targetPrice: parseFloat(targetPrice),
      condition,
      isTriggered: false,
    };

    setAlerts([...alerts, newAlert]);
    setSelectedCoin('');
    setTargetPrice('');
  };

  const handleRemoveAlert = (alertId: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
  };

  if (loading) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        <div className='space-y-4'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='h-16 bg-gray-200 dark:bg-gray-700 rounded'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>🔔 Price Alerts</h2>
      <div className='space-y-4'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className='flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value=''>Select a coin</option>
            {coins.map((coin) => (
              <option
                key={coin.id}
                value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
            className='w-full sm:w-32 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value='above'>Above</option>
            <option value='below'>Below</option>
          </select>
          <input
            type='number'
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder='Target price'
            className='w-full sm:w-32 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleAddAlert}
            disabled={!selectedCoin || !targetPrice}
            className='w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'>
            Add Alert
          </button>
        </div>
        <div className='space-y-2'>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className='flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700'>
              <div>
                <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                  {alert.coinName} ({alert.coinSymbol.toUpperCase()})
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Alert when price goes {alert.condition} ${alert.targetPrice}
                </p>
              </div>
              <button
                onClick={() => handleRemoveAlert(alert.id)}
                className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'>
                Remove
              </button>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-4'>
              No price alerts set. Add one above to get notified of price changes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceAlerts;
