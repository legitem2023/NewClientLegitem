'use client'
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { setDrawer } from 'Redux/drawerSlice';
import { setSearch } from 'Redux/searchSlice';
import Image from 'next/image';
import Navigation from '../../../json/navigation.json';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import InstallPWAButton from '../InstallationApp/InstallPWAButton';
import OrderNotification from 'components/Notification/OrderNotification';
import Dropdown from './Dropdown';
import { deletecookies } from 'components/cookies/cookie';

const PageHeader: React.FC = () => {
  const dispatch = useDispatch();
  const currentPath = usePathname();
  const redirect = useRouter();
  const drawerState = useSelector((state: any) => state.drawer.drawer);
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);
  
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const Ref = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (window.innerWidth < 1080) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 200); // Delay para hindi agad mawala bago maclick
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const FillText = (item: any) => {
    setQuery(item.name);
    setSuggestions([]); // I-clear ang list pagkatapos ng pagpili
    if (Ref.current) {
      Ref.current.value = item.name;
    }
  };

  const toggleDrawer = () => {
    dispatch(setDrawer(!drawerState));
  };

  return (
    <>
      <InstallPWAButton />
      <div className="Header">
        <div className="HeaderRight">
          <div>
            <Image
              src="/image/Crowd.svg"
              alt="Logo"
              width={874}
              height={373}
              className="Logo"
              onClick={() => redirect.push('/Home')}
              onError={(e) => console.error('Image failed to load', e)}
            />
          </div>
          <div>
            <div style={{
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
              zIndex: '999',
              backgroundColor: isFocused ? '#ffffff' : 'transparent'
            }}>
              <input
                type="text"
                ref={Ref}
                style={{  
                  position:'relative',  
                  width: '95%',  
                  top: '0px',  
                  transition: 'ease 0.5s',  
                  margin: '10px',  
                  boxSizing: 'border-box',  
                }}
                placeholder="Search"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="searchEngine"
                onChange={handleChange}
              />
              {suggestions.length > 0 && (
                <ul style={{ width: '100%', listStyleType: 'none', position: 'relative', paddingLeft: "0px" }}>
                  {suggestions.map((item: any, index: number) => (
                    <li
                      key={index}
                      style={{ padding: '10px', cursor: 'pointer' }}
                      onClick={() => FillText(item)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="HeaderLeft">
          <div className="Navigation">
            <div className="HeaderNav">
              <Icon icon="iconamoon:menu-burger-horizontal-duotone" onClick={toggleDrawer} />
            </div>
            {Navigation.map((item: any, idx: number) => (
              item.Name === 'Account' ? (
                <nav key={idx} className="Account">
                  {!cookie ? (
                    <Link href="./Login">
                      <Icon icon="ic:round-login" />
                      <span className="hideInmobile">Login</span>
                    </Link>
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Icon icon={item.icon} />
                      <span className="hideInmobile">{item.Name}</span>
                    </div>
                  )}
                  {cookie && item.Name === 'Account' && (
                    <Dropdown path={process.env.NEXT_PUBLIC_PATH} deletecookies={deletecookies} OrderNotification={OrderNotification} />
                  )}
                </nav>
              ) : (
                <Link href={process.env.NEXT_PUBLIC_PATH + item.Link} key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
                  <Icon icon={item.icon} />
                  <span className="hideInmobile">{item.Name}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;