'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie';

import Account from 'components/Account/Account';
import Order from 'components/Order/Order';
import ProductsTab from 'components/Products/ProductsTab';
import News from 'components/News/News';
import CartBody from 'components/Cart/CartBody';
import PrivateMessages from 'components/PersonalMessages/PrivateMessages';
import PublicMessages from 'components/Crowd/Messages';
import Home from 'components/Home/Home';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableTabs from 'components/Reusable/ReusableTabs';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
import Likes from 'components/Likes/Likes';
export default function Index() { 
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const menu = [
    { label: "Dashboard", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Logout", href: "/logout" },
  ];
  
  const tabItms = [
    { name: 'Address Book', icon: 'icomoon-free:address-book', content: <Account /> },
    { name: 'My Orders', icon: 'wpf:shopping-basket', content: <Order /> },
    { name: 'Likes', icon: 'mdi:like', content: <Likes/> },
    { name: 'Messages', icon: 'typcn:messages', content: <PrivateMessages /> },
    { name: 'Logout', icon: 'ic:sharp-logout', content: <CartBody /> },
  ];

  const tabItems = [
    { name: 'Home', icon: 'ic:sharp-home', content: <Home /> },
    { name: 'Products', icon: 'bi:tags-fill', content: <ProductsTab /> },
    { name: 'News', icon: 'fa6-solid:newspaper', content: <News /> },
    { name: 'Crowd', icon: 'simple-icons:crowdsource', content: <PublicMessages /> },
    { name: 'Account', icon: 'mdi:badge-account-horizontal', content: <ReusableTabs tabs={tabItms} /> },
    { name: 'Cart', icon: 'mdi:cart', content: <CartBody /> },
  ];

  const cookieState = useSelector((state: any) => state.cookie.cookie);
  console.log(cookieState);

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
