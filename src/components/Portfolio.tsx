import React, { useState, useEffect } from 'react';

interface PortfolioItem {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
}

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [coins, setCoins] = useState<Array<{ id: string; name: string; symbol: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false',
        );
        const data = await response.json();
        setCoins(
          data.map((coin: any) => ({
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

  useEffect(() => {
    const updatePortfolioValues = async () => {
      if (portfolio.length === 0) return;

      try {
        const coinIds = portfolio.map((item) => item.coinId).join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`,
        );
        const prices = await response.json();

        const updatedPortfolio = portfolio.map((item) => ({
          ...item,
          currentPrice: prices[item.coinId]?.usd || item.currentPrice,
        }));

        setPortfolio(updatedPortfolio);

        const newTotalValue = updatedPortfolio.reduce(
          (sum, item) => sum + item.amount * item.currentPrice,
          0,
        );
        const newTotalProfit = updatedPortfolio.reduce(
          (sum, item) => sum + item.amount * (item.currentPrice - item.purchasePrice),
          0,
        );

        setTotalValue(newTotalValue);
        setTotalProfit(newTotalProfit);
      } catch (error) {
        console.error('Error updating portfolio values:', error);
      }
    };

    updatePortfolioValues();
    const interval = setInterval(updatePortfolioValues, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [portfolio]);

  const handleAddToPortfolio = () => {
    if (!selectedCoin || !amount || !purchasePrice) return;

    const coin = coins.find((c) => c.id === selectedCoin);
    if (!coin) return;

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      coinId: coin.id,
      coinName: coin.name,
      coinSymbol: coin.symbol,
      amount: parseFloat(amount),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice: parseFloat(purchasePrice),
    };

    setPortfolio([...portfolio, newItem]);
    setSelectedCoin('');
    setAmount('');
    setPurchasePrice('');
  };

  const handleRemoveFromPortfolio = (itemId: string) => {
    setPortfolio(portfolio.filter((item) => item.id !== itemId));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
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
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col overflow-auto'>
      <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>💼 Portfolio</h2>
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
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Amount'
            className='w-full sm:w-32 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='number'
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder='Purchase price'
            className='w-full sm:w-32 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleAddToPortfolio}
            disabled={!selectedCoin || !amount || !purchasePrice}
            className='w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'>
            Add to Portfolio
          </button>
        </div>
        <div className='space-y-2'>
          {portfolio.map((item) => {
            const profit = item.amount * (item.currentPrice - item.purchasePrice);
            const profitPercentage =
              ((item.currentPrice - item.purchasePrice) / item.purchasePrice) * 100;

            return (
              <div
                key={item.id}
                className='flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700'>
                <div>
                  <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                    {item.coinName} ({item.coinSymbol.toUpperCase()})
                  </h3>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {item.amount} coins @ {formatCurrency(item.purchasePrice)}
                  </p>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-medium text-gray-900 dark:text-white'>
                    {formatCurrency(item.amount * item.currentPrice)}
                  </div>
                  <div
                    className={`text-xs ${
                      profit >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                    {profit >= 0 ? '+' : ''}
                    {formatCurrency(profit)} ({profitPercentage.toFixed(2)}%)
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromPortfolio(item.id)}
                  className='ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'>
                  Remove
                </button>
              </div>
            );
          })}
          {portfolio.length === 0 && (
            <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-4'>
              No coins in your portfolio. Add some above to start tracking.
            </p>
          )}
        </div>
        {portfolio.length > 0 && (
          <div className='pt-4 mt-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-gray-900 dark:text-white'>Total Value</span>
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                {formatCurrency(totalValue)}
              </span>
            </div>
            <div className='flex items-center justify-between mt-2'>
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                Total Profit/Loss
              </span>
              <span
                className={`text-sm font-medium ${
                  totalProfit >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                {totalProfit >= 0 ? '+' : ''}
                {formatCurrency(totalProfit)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
