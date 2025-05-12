import React from 'react';

export type SortOption = 'rank' | 'price' | 'change' | 'name';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'>
      <option value='rank'>Rank</option>
      <option value='price'>Price</option>
      <option value='change'>24h Change</option>
      <option value='name'>Name</option>
    </select>
  );
};

export default SortDropdown;
