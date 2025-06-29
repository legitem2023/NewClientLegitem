'use client';

import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from 'Redux/drawerSlice';
import { setSearch } from 'Redux/searchSlice';

const SearchEngine: React.FC = () => {
  const dispatch = useDispatch();
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);
  const currentPath = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleFocus = () => {
    if (window.innerWidth < 1024) {
      setIsFocused(true);
    }
  };

  const handleBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearch(value));

    if (value.trim()) {
      const filtered = allItems.filter((item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const fillText = (itemName: string) => {
    setQuery(itemName);
    dispatch(setSearch(itemName));
    if (inputRef.current) {
      inputRef.current.value = itemName;
      setIsFocused(false);
    }
  };

  return (
    <div
      className={`search-engine-container ${isFocused ? 'search-focused' : ''}`}
      style={{
        position: isFocused ? 'fixed' : 'relative',
        backgroundColor: isFocused ? '#ffffff' : 'transparent',
        zIndex: 99999,
        width: '100%',
      }}
    >
      <input
        type="text"
        ref={inputRef}
        placeholder="Search"
        onFocus={handleFocus}
        onKeyDown={handleBlur}
        onChange={handleChange}
        className="search-input"
        style={{
          width: '95%',
          margin: '10px',
          boxSizing: 'border-box',
        }}
      />

      {suggestions.length > 0 && isFocused && (
        <ul className="suggestions-list">
          {suggestions.map((item: any, index: number) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => fillText(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchEngine;
