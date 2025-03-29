'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from 'Redux/searchSlice';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import InstallPWAButton from '../InstallationApp/InstallPWAButton';
import ClientIP from 'components/Commands/ClientIP';
import Navigation from '../../../json/navigation.json';
import Link from 'next/link';
import { deletecookies } from 'components/cookies/cookie';
import OrderNotification from 'components/Notification/OrderNotification';
import Dropdown from './Dropdown';
import { setDrawer } from 'Redux/drawerSlice';

const PageHeader: React.FC = () => {
  const path = process.env.NEXT_PUBLIC_PATH;
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const drawerState = useSelector((state: any) => state.drawer.drawer);
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);

  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const currentPath = usePathname();
  const redirect = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const result = currentPath.replace(/[^a-zA-Z]/g, "");

  const handleFocus = () => {
    if (window.innerWidth < 1080) {
      setIsFocused(true);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (item: any) => {
    if (item.Link !== currentPath) {
      setLoadingLink(item.Name);
    }
  };

  const toggleDrawer = () => {
    dispatch(setDrawer(!drawerState));
  };

  // Handle input change and filter suggestions
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearch(value));

    if (value.length > 0) {
      const filtered = allItems.filter((item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [allItems, dispatch]);

  const handleSelectSuggestion = (item: any) => {
    setQuery(item.name);
    setIsFocused(false);
  };

  return (
    <>
      <InstallPWAButton />
      <ClientIP />
      <div className='Header'>
        <div className='HeaderRight'>
          <Image
            src="/image/Crowd.svg"
            alt="Logo"
            width={874}
            height={373}
            className='Logo'
            onClick={() => redirect.push('/Home')}
            onError={(e) => console.error('Image failed to load', e)}
          />

          {/* Search Input */}
          {result === 'Products' && (
            <div ref={searchContainerRef} style={{ position: isFocused ? 'fixed' : 'relative', zIndex: 999 }}>
              <input
                type='text'
                placeholder='Search'
                ref={inputRef}
                value={query}
                className='searchEngine'
                onFocus={handleFocus}
                onChange={handleChange}
              />
              {isFocused && suggestions.length > 0 && (
                <ul className='suggestions'>
                  {suggestions.map((item: any, index: number) => (
                    <li key={index} onClick={() => handleSelectSuggestion(item)}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className='HeaderLeft'>
          <div className='Navigation'>
            <div className='HeaderNav'>
              <Icon icon='iconamoon:menu-burger-horizontal-duotone' onClick={toggleDrawer} />
            </div>
            {Navigation.map((item: any, idx: number) => (
              <Link
                key={idx}
                href={path + item.Link}
                style={{
                  backgroundColor:
                    result === item.Name || (['Account', 'Order', 'Return', 'Likes'].includes(result) && item.Name === 'Account')
                      ? 'rgb(87, 39, 0)'
                      : 'transparent',
                }}
                onClick={() => handleClick(item)}
                className={item.Name === 'Account' ? 'Account' : ''}
              >
                {loadingLink === item.Name && item.Link !== "." + currentPath ? (
                  <Icon icon="eos-icons:loading" />
                ) : (
                  <Icon
                    icon={item.icon}
                    style={{
                      color:
                        result === item.Name || (['Account', 'Order', 'Return', 'Likes'].includes(result) && item.Name === 'Account')
                          ? '#ffffff'
                          : 'rgb(87, 39, 0)',
                    }}
                  />
                )}
                <span className='hideInmobile'>{item.Name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
