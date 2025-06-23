'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Partial/Header/PageHeader';
import PageFooter from '../../components/Partial/Footer/PageFooter';

import PageOrder from '../../components/Order/PageOrder';

import PageAccount from '../../components/Account/PageAccount
import Products from '../../components/Products/Products';
import News from 'components/News/News'
import CartBody from 'components/Cart/CartBody'
import Messages from 'components/Crowd/Messages'
import Home from '../../components/Home/Home'
import { Suspense } from 'react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
import ReusableTabs from 'components/Reusable/ReusableTabs';
import { cookies } from 'components/cookies/cookie';
import { useRouter } from 'next/navigation'
export default function Index() {
    const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false); // End loading state
  }, [router]);

  if (isLoading) {
    return <Loading/>; // Show loading state while checking
  }

const tabItms = [
    { name: 'Address Book', icon: 'ic:sharp-home', content: <PageAccount/> },
    { name: 'My Orders', icon: 'bi:tags-fill', content: <PageOrder/> },
    { name: 'Likes', icon: 'fa6-solid:newspaper', content: <News/> },
    { name: 'Messages', icon: 'simple-icons:crowdsource', content: <Messages/> },
    { name: 'Logout', icon: 'mdi:badge-account-horizontal', content: <CartBody/> },
      
  ];
  
  const tabItems = [
    { name: 'Home', icon: 'ic:sharp-home', content: <Home/> },
    { name: 'Products', icon: 'bi:tags-fill', content: <Products/> },
    { name: 'News', icon: 'fa6-solid:newspaper', content: <News/> },
    { name: 'Crowd', icon: 'simple-icons:crowdsource', content: <Messages/> },
    { name: 'Account', icon: 'mdi:badge-account-horizontal', content: <ReusableTabs tabs={tabItms}/> },
    { name: 'Cart', icon: 'mdi:cart', content: <CartBody/> }  
  ];
  return (
    <Suspense fallback={<Loading/>}>
    {/*<div className='Main'>
      <PageHeader />
      <HomeBody/>
      <PageFooter />
    </div>*/}
      <ReusableSwiperTabs tabs={tabItems}/>
    </Suspense>
  )
}
