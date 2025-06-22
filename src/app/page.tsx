'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Partial/Header/PageHeader';
import PageFooter from '../../components/Partial/Footer/PageFooter';
import ProductsBody from '../../components/Products/ProductsBody';
import CrowdMessages from 'components/Crowd/CrowdMessages'
import HomeBody from '../../components/Home/HomeBody'
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
    { name: 'Home', icon: '📄', content: <HomeBody /> },
    { name: 'Products', icon: '🛒', content: <ProductsBody  /> },
    { name: 'Crowd', icon: '⚙️', content: <CrowdMessages /> }
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
