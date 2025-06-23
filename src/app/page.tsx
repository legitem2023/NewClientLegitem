'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Partial/Header/PageHeader';
import PageFooter from '../../components/Partial/Footer/PageFooter';
import Products from '../../components/Products/Products';
import News from 'components/News/News'
import CartBody from 'components/Cart/CartBody'
import Messages from 'components/Crowd/Messages'
import Home from '../../components/Home/Home'
import { Suspense } from 'react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
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


  
  const tabItems = [
    { name: 'Home', icon: '📄', content: <Home/> },
    { name: 'Products', icon: '🛒', content: <Products/> },
    { name: 'News', icon: '🛒', content: <News/> },
    { name: 'Crowd', icon: '⚙️', content: <Messages/> },
    { name: 'Cart', icon: '🛒', content: <CartBody/> }
      
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
