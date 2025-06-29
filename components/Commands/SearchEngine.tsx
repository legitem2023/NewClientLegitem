'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from 'Redux/drawerSlice';
import { setSearch } from 'Redux/searchSlice';
import { setCategoryData } from 'Redux/categoryDataSlice';
import { setProductTypeData } from 'Redux/productTypeDataSlice';
import { GET_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries';

const SearchEngine: React.FC = () => {
  const dispatch = useDispatch();
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);
  const drawerState = useSelector((state: any) => state.drawer.drawer);

  const currentPath = usePathname();
  const redirect = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const { data: catData } = useQuery(GET_CATEGORY);
  const { data: prodTypeData } = useQuery(READ_PRODUCT_TYPES);

  useEffect(() => {
    if (catData) {
      dispatch(setCategoryData(catData.getCategory));
    }
  }, [catData, dispatch]);

  useEffect(() => {
    if (prodTypeData) {
      dispatch(setProductTypeData(prodTypeData.getProductTypes));
    }
  }, [prodTypeData, dispatch]);

  const handleFocus = () => {
    if (window.innerWidth < 1024) {
      setIsFocused(true);
    }
  };

  const handleBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsFocused(false);
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
    if (inputRef.current) {
      inputRef.current.value = itemName;
      setIsFocused(false);
    }
  };

  const result = currentPath.replace(/[^a-zA-Z]/g, '');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transition: 'ease 0.3s',
        position: isFocused ? 'fixed' : 'relative',
        left: '0px',
        right: '0px',
        top: '0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        zIndex: 999,
        backgroundColor: isFocused ? '#ffffff' : 'transparent',
      }}
    >
      <input
        type="text"
        style={{
          display: 'flex',
          position: 'relative',
          width: '95%',
          top: '0px',
          transition: 'ease 0.5s',
          margin: '10px',
          boxSizing: 'border-box',
        }}
        ref={inputRef}
        placeholder="Search"
        onFocus={handleFocus}
        onKeyDown={handleBlur}
        className="searchEngine"
        onChange={handleChange}
      />

      {suggestions.length > 0 && isFocused && (
        <ul
          style={{
            width: '100%',
            listStyleType: 'none',
            left: '0px',
            position: 'relative',
            paddingLeft: '0px',
          }}
        >
          {suggestions.map((item: any, index: number) => (
            <li
              key={index}
              style={{ padding: '10px', cursor: 'pointer' }}
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
