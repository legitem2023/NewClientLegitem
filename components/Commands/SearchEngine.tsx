'use client';

import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from 'Redux/searchSlice';

const SearchEngine: React.FC = () => {
  const dispatch = useDispatch();
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleFocus = () => {
    setIsFocused(true);
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
      inputRef.current.blur();
    }
  };

  return (
    <div className="search-engine-wrapper">
      <input
        type="text"
        ref={inputRef}
        placeholder="Search"
        onFocus={handleFocus}
        onKeyDown={handleBlur}
        onChange={handleChange}
        className="search-input"
      />

      {suggestions.length > 0 && isFocused && (
        <div className="suggestions-container">
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
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
