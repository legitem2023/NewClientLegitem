'use client'
import React, { useEffect, useState } from 'react'
import Navigation from '../../../json/navigation.json'
import Link from 'next/link'
import { Icon } from '@iconify/react';
// import { setGlobalState, useGlobalState } from 'state';
import { deletecookies } from 'components/cookies/cookie';
import { usePathname, useRouter } from 'next/navigation';
import OrderNotification from 'components/Notification/OrderNotification'

import InstallPWAButton from '../InstallationApp/InstallPWAButton';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from 'Redux/drawerSlice';
import ReusableNotification from 'components/UI/ReusableNotification';
import Cookie from 'components/cookies/Cookie';
const PageHeader: React.FC = () => {
  const path = process.env.NEXT_PUBLIC_PATH;
  const dispatch = useDispatch();
  const cookie = useSelector((state:any)=> state.cookie.cookie);
  const drawerState = useSelector((state:any)=> state.drawer.drawer);//'';//useGlobalState("drawer");
  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const currentPath = usePathname();
  const redirect = useRouter();

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
  return (
    <>
      <InstallPWAButton/>
    <div className='Header'>
      <div className='HeaderRight'>
        <span className='Logo openDrawer' onClick={()=>redirect.push('/Home')}></span>        
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