'use client'
import React, { useCallback, useEffect, useMemo, useState,useRef } from 'react';
import { useQuery } from '@apollo/client';
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
import { GET_CATEGORY, GET_CHILD_INVENTORY } from 'graphql/queries';

const PageHeader: React.FC = () => {
  
  const path = process.env.NEXT_PUBLIC_PATH;
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const drawerState = useSelector((state: any) => state.drawer.drawer);
   const allItems = useSelector((state:any)=> state.suggestedItems.suggestedItems);//ProductsData?.getChildInventory || [];

  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const currentPath = usePathname();
  const redirect = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const Ref = useRef<HTMLInputElement>(null);


 const result = currentPath.replace(/[^a-zA-Z]/g, ""); 
console.log(result+"<==="); // "HeWrld"

  
  const handleFocus = () => {
    if (window.innerWidth < 1080) {
    setIsFocused(true)
    };
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

  

  // Handle input change and filter suggestions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearch(value));
    if (value.length > 0) {
      const filtered = allItems.filter((item:any) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }; 
  const FillText = (item: any) => {
  setQuery(item); 
  if (Ref.current) {
    Ref.current.value = item;
  }
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
              position:isFocused?'fixed':'relative',
              left:'0px',
              right:'0px',
              top:'0px',
              display:'flex',
              flexDirection:'column',
              justifyContent:'flex-start',
              zIndex:'999',
              backgroundColor:isFocused?'#ffffff':'transparent'
            }}>
              <input
                type='text'
                style={{
                  position:'relative',
                  width: '95%',
                  top: '0px',
                  transition: 'ease 0.5s',
                  margin: '10px',
                  boxSizing: 'border-box',
                }}
                ref={Ref}
                placeholder='Search'
                onFocus={handleFocus}
                onBlur={handleBlur}
                className='searchEngine'
                onChange={(e:any)=>handleChange(e)}
              />
                  {suggestions.length > 0 && (
        <ul style={{width:'100%',listStyleType:'none',left:'0px',position:'relative',display:isFocused?'block':'none',paddingLeft:"0px"}}>
          {suggestions.map((item:any, index:number) => (
            <li
              key={index}
              style={{padding:'10px',cursor:'pointer'}}
              onClick={() => FillText(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
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
