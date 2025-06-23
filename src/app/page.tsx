'use client';
import React, { useEffect, useState, Suspense } from 'react';
//import { useQuery } from '@apollo/client';
//import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie'
import ReusableArrowTabs from 'components/Reusable/ReusableArrowTabs';
import Order from 'components/Order/Order';
//import PageAccount from 'components/Account/PageAccount';
import Products from 'components/Products/Products';
import News from 'components/News/News';
import CartBody from 'components/Cart/CartBody';
import Messages from 'components/Crowd/Messages';
import Home from 'components/Home/Home';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
import ReusableTabs from 'components/Reusable/ReusableTabs';

export default function Index() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const tabItms = [
    { name: 'Address Book', icon: 'ic:sharp-home', content: <Order/> },
    { name: 'My Orders', icon: 'bi:tags-fill', content: <Order/> },
    { name: 'Likes', icon: 'fa6-solid:newspaper', content: <News /> },
    { name: 'Messages', icon: 'simple-icons:crowdsource', content: <Messages /> },
    { name: 'Logout', icon: 'mdi:badge-account-horizontal', content: <CartBody /> },
  ];

  const tabItems = [
    { name: 'Home', icon: 'ic:sharp-home', content: <Home /> },
    { name: 'Products', icon: 'bi:tags-fill', content: <Products /> },
    { name: 'News', icon: 'fa6-solid:newspaper', content: <News /> },
    { name: 'Crowd', icon: 'simple-icons:crowdsource', content: <Messages /> },
    { name: 'Account', icon: 'mdi:badge-account-horizontal', content: <Order/> },
    { name: 'Cart', icon: 'mdi:cart', content: <CartBody /> },
  ];

  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) return <Loading />;
 
  return (
    <Suspense fallback={<Loading />}>
      <ReusableSwiperTabs tabs={tabItems} />
    </Suspense>
  );
     }
