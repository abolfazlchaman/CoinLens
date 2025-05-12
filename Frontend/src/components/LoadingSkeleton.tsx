import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 5, className = 'h-20' }) => {
  return (
    <div className='animate-pulse space-y-4'>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`${className} bg-gray-200 dark:bg-gray-700 rounded-lg`}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
