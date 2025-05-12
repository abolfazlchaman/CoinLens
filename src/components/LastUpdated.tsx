import React from 'react';

interface LastUpdatedProps {
  timestamp: number;
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ timestamp }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className='text-sm text-gray-500 dark:text-gray-400'>
      Last updated: {formatTime(new Date(timestamp))}
    </div>
  );
};

export default LastUpdated;
