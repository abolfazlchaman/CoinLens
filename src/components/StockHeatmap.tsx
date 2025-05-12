import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const StockHeatmap = () => {
  return (
    <div className='mt-8'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-2xl font-bold'>Stock Market Heatmap</h2>
          <button
            disabled
            className='btn btn-primary opacity-50 cursor-not-allowed flex items-center space-x-2'
            title='Coming soon'>
            <ChartBarIcon className='h-5 w-5' />
            <span>View Heatmap</span>
          </button>
        </div>
        <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
          <p>Stock market heatmap visualization coming soon!</p>
          <p className='text-sm mt-2'>
            This feature will provide an interactive visualization of market performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockHeatmap;
