import React, { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';
import { toast } from 'sonner';

interface PriceAlert {
  id: string;
  coinId: string;
  coinName: string;
  targetPrice: number;
  isAbove: boolean;
  currentPrice: number;
  isTriggered: boolean;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

export function PriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [isAbove, setIsAbove] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>('default');

  useEffect(() => {
    // Request notification permission when component mounts
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
          if (permission === 'granted') {
            toast.success(
              'Notifications enabled! You will receive alerts when prices hit your targets.',
            );
          }
        });
      } else {
        setNotificationPermission(Notification.permission);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getMarketData();
        setCoins(
          data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
          })),
        );
        setError(null);
      } catch (err) {
        console.error('Error fetching coins:', err);
        setError('Failed to fetch coins. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    const updateAlertPrices = async () => {
      if (alerts.length === 0) return;

      try {
        const updatedAlerts = await Promise.all(
          alerts.map(async (alert: PriceAlert) => {
            const price = await cryptoApi.getCoinPrice(alert.coinId);
            const isTriggered =
              (alert.isAbove && price >= alert.targetPrice) ||
              (!alert.isAbove && price <= alert.targetPrice);

            // Show notification if alert is triggered
            if (isTriggered && notificationPermission === 'granted' && !alert.isTriggered) {
              new Notification('Price Alert Triggered!', {
                body: `${alert.coinName} is now ${alert.isAbove ? 'above' : 'below'} $${
                  alert.targetPrice
                }`,
                icon: '/favicon.ico',
              });
            }

            return {
              ...alert,
              currentPrice: price,
              isTriggered,
            };
          }),
        );

        setAlerts(updatedAlerts);
      } catch (err) {
        console.error('Error updating alert prices:', err);
      }
    };

    updateAlertPrices();
    const interval = setInterval(updateAlertPrices, 60 * 1000); // Update every minute
    return () => clearInterval(interval);
  }, [alerts, notificationPermission]);

  const handleAddAlert = () => {
    if (!selectedCoin || !targetPrice) return;

    const coin = coins.find((c: Coin) => c.id === selectedCoin);
    if (!coin) return;

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      coinId: selectedCoin,
      coinName: coin.name,
      targetPrice: parseFloat(targetPrice),
      isAbove,
      currentPrice: 0,
      isTriggered: false,
    };

    setAlerts((prevAlerts: PriceAlert[]) => [...prevAlerts, newAlert]);
    setSelectedCoin('');
    setTargetPrice('');
    toast.success('Price alert created successfully!');
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prevAlerts: PriceAlert[]) =>
      prevAlerts.filter((alert: PriceAlert) => alert.id !== id),
    );
    toast.success('Price alert deleted successfully!');
  };

  if (loading) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <div className='text-red-500 dark:text-red-400'>{error}</div>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
          Create Price Alert
        </h2>
        <div className='space-y-4'>
          <div>
            <label
              htmlFor='coin'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Select Coin
            </label>
            <select
              id='coin'
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500'>
              <option value=''>Select a coin</option>
              {coins.map((coin) => (
                <option
                  key={coin.id}
                  value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Target Price (USD)
            </label>
            <input
              type='number'
              id='price'
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Enter target price'
            />
          </div>
          <div className='flex items-center space-x-4'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                checked={isAbove}
                onChange={() => setIsAbove(true)}
                className='form-radio text-blue-500'
              />
              <span className='ml-2 text-gray-700 dark:text-gray-300'>Above</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                checked={!isAbove}
                onChange={() => setIsAbove(false)}
                className='form-radio text-blue-500'
              />
              <span className='ml-2 text-gray-700 dark:text-gray-300'>Below</span>
            </label>
          </div>
          <button
            onClick={handleAddAlert}
            disabled={!selectedCoin || !targetPrice}
            className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'>
            Add Alert
          </button>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className='rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
            Active Alerts
          </h2>
          <div className='space-y-4'>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <div>
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                    {alert.coinName}
                  </h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Alert when price is {alert.isAbove ? 'above' : 'below'} ${alert.targetPrice}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Current price: ${alert.currentPrice.toFixed(2)}
                  </p>
                </div>
                <div className='flex items-center space-x-4'>
                  {alert.isTriggered && (
                    <span className='px-2 py-1 text-sm font-medium text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-800 rounded-full'>
                      Triggered
                    </span>
                  )}
                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className='text-red-500 hover:text-red-600 focus:outline-none'>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PriceAlertsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <PriceAlerts />
    </ErrorBoundary>
  );
}
