'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Navigation from '../../../json/navigation.json';
import Link from 'next/link';
import ClientIP from 'components/Commands/ClientIP';
import { Icon } from '@iconify/react';
import { deletecookies } from 'components/cookies/cookie';
import { usePathname, useRouter } from 'next/navigation';
import OrderNotification from 'components/Notification/OrderNotification'
import InstallPWAButton from '../InstallationApp/InstallPWAButton';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from 'Redux/drawerSlice';
import Image from 'next/image';
import { setSearch } from 'Redux/searchSlice';
import { throttle } from 'lodash';

const PageHeader: React.FC = () => {
  const path = process.env.NEXT_PUBLIC_PATH;
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const drawerState = useSelector((state: any) => state.drawer.drawer);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const currentPath = usePathname();
  const redirect = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = (item: any) => {
    if (item.Link !== currentPath) {
      setLoadingLink(item.Name);
    }
  };

  const toggleDrawer = () => {
    dispatch(setDrawer(!drawerState));
  }

  /*
  const searchEngine = (inputValue: any) => {
    // throttledSearchEngine(inputValue);
    const searchData = inputValue.target.value;
    dispatch(setSearch(searchData || ''));
  };
*/



  const throttledSearchEngine = useCallback(
  throttle((inputValue: any) => {
    inputValue.preventDefault();
    const searchData = inputValue.target.value;
    if (inputValue === '') {
      dispatch(setSearch('')); // Fix extra parenthesis
    } else {
      dispatch(setSearch(searchData)); // Fix extra parenthesis
    }
  }, 2000),
  [dispatch]
);

const searchEngine = (inputValue: any) => {
  throttledSearchEngine(inputValue.target.value); // Call the throttled function
};

  return (
    <>
      <InstallPWAButton />
      <ClientIP/>
      <div className='Header'>
        <div className='HeaderRight'>
          <div>
            <Image
              src="/image/Crowd.svg"
              alt="Logo"
              width={874}
              height={373}
              className='Logo'
              onClick={() => redirect.push('/Home')}
              onError={(e) => {
                console.error('Image failed to load', e);
              }}
            />
          </div>
          <div>
            <div style={{
              width: '100%',
              height: '100%',
              transition: 'ease 0.3s',
            }}>
              <input
                type='text'
                style={{
                  width: '95%',
                  top: '0px',
                  transition: 'ease 0.5s',
                  margin: '10px',
                  boxSizing: 'border-box',
                }}
                placeholder='Search'
                onFocus={handleFocus}
                onBlur={handleBlur}
                className='searchEngine'
                onChange={(e:any)=>searchEngine(e)}
              />
            </div>
          </div>
        </div>
        <div className='HeaderLeft'>
          <div className='Navigation'>
            <div className='HeaderNav'>
              <Icon icon='iconamoon:menu-burger-horizontal-duotone' onClick={toggleDrawer} />
            </div>
            {Navigation.map((item: any, idx: any) => (
              item.Name === 'Account' ?
                <nav key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
                  {!cookie ?
                    <Link href='./Login'>
                      <Icon icon="ic:round-login" />
                      <span className='hideInmobile'>Login</span>
                    </Link>
                    :
                    <>
                      <Icon icon={item.icon} />
                      <span className='hideInmobile'>{item.Name}</span>
                    </>
                  }
                  {cookie && item.Name === 'Account' &&
                    <Dropdown path={path} deletecookies={deletecookies} OrderNotification={OrderNotification} />
                  }
                </nav> :
                <Link onClick={() => handleClick(item)} href={path + item.Link} key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
                  {loadingLink === item.Name && item.Link !== "." + currentPath ? (
                    <Icon icon="eos-icons:loading" />
                  ) : (
                    <Icon icon={item.icon} />
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
