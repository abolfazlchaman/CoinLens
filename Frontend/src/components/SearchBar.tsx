import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className='search-container'>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search for a crypto or stock...'
        className='search-input'
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className='clear-button'
          aria-label='Clear search'>
          <XMarkIcon className='h-5 w-5' />
        </button>
      )}
      <button
        className='search-button'
        aria-label='Search'>
        <MagnifyingGlassIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default SearchBar;
