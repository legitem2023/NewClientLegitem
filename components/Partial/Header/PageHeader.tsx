'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Navigation from '../../../json/navigation.json'
import Link from 'next/link'
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
  const cookie = useSelector((state:any)=> state.cookie.cookie);
  const drawerState = useSelector((state:any)=> state.drawer.drawer);//'';//useGlobalState("drawer");
  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const currentPath = usePathname();
  const redirect = useRouter();

  const [isFocused, setIsFocused] = useState(false); // State to track focus

  // Handle focus event
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle blur event
  const handleBlur = () => {
    setIsFocused(false);
  };



  const handleClick = (item: any) => {
    if (item.Link !== currentPath) {
      setLoadingLink(item.Name); // Set loading for clicked link only if it's not the current page
    }
  };

  const drawer = () =>{
    if(drawerState===true){
      dispatch(setDrawer(false));
    }else{
      dispatch(setDrawer(true));
    }
  }

  
  const searchEngine = (inputValue: any) => {
    // throttledSearchEngine(inputValue);
    const searchData = inputValue.target.value;
    dispatch(setSearch(searchData || ''));
  };



  return (
    <>
      <InstallPWAButton/>
    <div className='Header'>
      <div className='HeaderRight'>
        <div>
           <Image src="/image/Crowd.svg" alt="Logo" width={874} height={373} className='Logo' onClick={()=>redirect.push('/Home')}/>
        </div>
        <div>
          <div style={{
        width:'100%', // Change width based on focus
        height:'100%', // Change width based on focus
        transition: 'ease 0.3s', // Smooth transition
      }}>
            <input type='text' 
                   style={{
                    width: '95%',
                    top:"0px",
                    transition:"ease 0.5s",
                    margin:"10px",
                    boxSizing:"border-box"}}
                    
                    placeholder='Search' 
                   onFocus={handleFocus} // Trigger on focus
                   onBlur={handleBlur} className='searchEngine' onChange={searchEngine}/>
          </div>
        </div> 
      </div>
      <div className='HeaderLeft'>
      <div className='Navigation'>
        <div className='HeaderNav'>
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' onClick={()=>{drawer()}}>
          </Icon>
        </div>
        {Navigation.map((item: any, idx: any) => (
          item.Name === 'Account' ? 
          <nav key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
            {cookie === "" || cookie ===null || cookie ===undefined ?
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
            {cookie === "" || cookie ===null || cookie ===undefined?"" : item.Name === 'Account' ?
              <Dropdown path={path} deletecookies={deletecookies} OrderNotification={OrderNotification}/>: ""
            }
          </nav>:<Link onClick={() => handleClick(item)} href={path + item.Link} key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
                  {loadingLink === item.Name && item.Link !== "."+currentPath ? (
                    <Icon icon="eos-icons:loading" /> // Loading icon
                  ) : (
                    <Icon icon={item.icon} /> // Normal icon
                  )}
                    <span className='hideInmobile'>{item.Name}</span>
                    {/* {item.Name==='Cart'?cartItems.length>0?<ReusableNotification number={cartItems.length<1?"":cartItems.length}/>:<></>:<></>} */}

                 </Link>

        ))}
      </div>
      </div>
    </div>
    </>
  )
}

export default PageHeader