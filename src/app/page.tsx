'use client';
import React, { useEffect, useState, Suspense } from 'react';
//import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie'
import ReusableArrowTabs from 'components/Reusable/ReusableArrowTabs';
import Order from 'components/Order/Order';
import AddressBook from 'components/Account/AddressBook';


import Account from 'components/Account/Account'
import Products from 'components/Products/Products';
import News from 'components/News/News';
import CartBody from 'components/Cart/CartBody';
import Messages from 'components/Crowd/Messages';
import Home from 'components/Home/Home';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
import ReusableTabs from 'components/Reusable/ReusableTabs';
import ReusableSwipeMenu from 'components/Reusable/ReusableSwipeMenu';



export default function Index() { 
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const menu = [{ label: "Dashboard", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/logout" },
];
  
  const tabItms = [
    { name: 'Address Book', icon: 'icomoon-free:address-book', content: <Account/> },
    { name: 'My Orders', icon: 'wpf:shopping-basket', content: <Order/> },
    { name: 'Likes', icon: 'mdi:like', content: <News /> },
    { name: 'Messages', icon: 'typcn:messages', content: <ReusableSwipeMenu menuItems={menu}  main={()=>(<Messages/>)}/> },
    { name: 'Logout', icon: 'ic:sharp-logout', content: <CartBody /> },
  ];

  const tabItems = [
    { name: 'Home', icon: 'ic:sharp-home', content: <Home /> },
    { name: 'Products', icon: 'bi:tags-fill', content: <Products /> },
    { name: 'News', icon: 'fa6-solid:newspaper', content: <News /> },
    { name: 'Crowd', icon: 'simple-icons:crowdsource', content: <Messages /> },
    { name: 'Account', icon: 'mdi:badge-account-horizontal', content: <ReusableTabs tabs={tabItms}/> },
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
