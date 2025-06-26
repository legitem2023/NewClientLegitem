'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie';

import Account from 'components/Account/Account';
import Order from 'components/Order/Order';
import ProductsTab from 'components/Products/ProductsTab';
import NewsTab from 'components/News/NewsTab';
import CartBody from 'components/Cart/CartBody';
import PrivateMessages from 'components/PersonalMessages/PrivateMessages';
import PublicMessages from 'components/Crowd/PublicMessagesTab';
import HomeTab from 'components/Home/HomeTab';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableTabs from 'components/Reusable/ReusableTabs';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
import LikesTab from 'components/Likes/LikesTab';
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
    { name: 'Likes', icon: 'mdi:like', content: <LikesTab/> },
    { name: 'Messages', icon: 'typcn:messages', content: <PrivateMessages /> },
    { name: 'Logout', icon: 'ic:sharp-logout', content: <CartBody /> },
  ];

  const tabItems = [
    {id: 0,name: 'Home', icon: 'ic:sharp-home', content: <HomeTab/> },
    {id: 1,name: 'Products', icon: 'bi:tags-fill', content: <ProductsTab /> },
    {id: 2,name: 'News', icon: 'fa6-solid:newspaper', content: <NewsTab /> },
    {id: 3,name: 'Crowd', icon: 'simple-icons:crowdsource', content: <PublicMessages /> },
    {id: 4,name: 'Account', icon: 'mdi:badge-account-horizontal', content: <ReusableTabs tabs={tabItms} /> },
    {id: 5,name: 'Cart', icon: 'mdi:cart', content: <CartBody /> },
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
