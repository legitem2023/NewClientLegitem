'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie';
import About from 'components/About/About';
import Disclaimer from 'components/About/Disclaimer';
import Contact from 'components/About/Contact';
import FaQ from 'components/About/FaQ';
import Privacy from 'components/About/Privacy';
import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import Account from 'components/Account/Account';
import Order from 'components/Order/Order';
import ProductsTab from 'components/Products/ProductsTab';
import NewsTab from 'components/News/NewsTab';
import CartTab from 'components/Cart/CartTab';
import PrivateMessages from 'components/PersonalMessages/PrivateMessages';
import PublicMessages from 'components/Crowd/PublicMessagesTab';
import HomeTab from 'components/Home/HomeTab';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableTabs from 'components/Reusable/ReusableTabs';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
import LikesTab from 'components/Likes/LikesTab';

import LoginTab from 'components/Login/LoginTab';
import Ads from 'components/Ads/Ads';
export default function Index() { 
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [usetab,setTab]= useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

const Details = [
  {
    id: 6,
    name: 'About',
    icon: 'ic:sharp-home',
    content: (
      <ReusableFlexLayout
        childA={() => <></>}
        childB={() => <About />}
        childC={() => <></>}
      />
    ),
  },{
    id: 7,
    name: 'Faq',
    icon: 'bi:tags-fill',
    content: (
      <ReusableFlexLayout
        childA={() => <></>}
        childB={() => <FaQ/>}
        childC={() => <></>}
      />
    ),
  },{
    id: 8,
    name: 'Disclaimer',
    icon: 'fa6-solid:newspaper',
    content: (
      <ReusableFlexLayout
        childA={() => <></>}
        childB={() => <Disclaimer/>}
        childC={() => <></>}
      />
    ),
  },{
    id: 9,
    name: 'Privacy',
    icon: 'mdi:badge-account-horizontal',
    content: (
      <ReusableFlexLayout
        childA={() => <></>}
        childB={() => <Privacy/>}
        childC={() => <></>}
      />
    ),
  },{
    id: 10,
    name: 'Contact',
    icon: 'simple-icons:crowdsource',
    content: (
      <ReusableFlexLayout
        childA={() => <></>}
        childB={() => <Contact/>}
        childC={() => <></>}
      />
    ),
  }
];

  const tabItms = [
    { id: 0, name: 'Address Book', icon: 'icomoon-free:address-book', content: <Account /> },
    { id: 1, name: 'My Orders', icon: 'wpf:shopping-basket', content: <Order /> },
    { id: 2, name: 'Likes', icon: 'mdi:like', content: <LikesTab/> },
    { id: 3, name: 'Messages', icon: 'typcn:messages', content: <PrivateMessages /> },
    { id: 4, name: 'Logout', icon: 'ic:sharp-logout', content: <CartBody /> },
  ];

  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
  const tabItems = [
    {id: 0, name: 'Home', icon: 'ic:sharp-home', content: <HomeTab/> },
    {id: 1, name: 'Products', icon: 'bi:tags-fill', content: <ProductsTab /> },
    {id: 2, name: 'News', icon: 'fa6-solid:newspaper', content: <NewsTab /> },
    {id: 3, name: 'Crowd', icon: 'simple-icons:crowdsource', content: <LoginTab /> },
    {id: 4, name: 'Account', icon: 'mdi:badge-account-horizontal', content: <LoginTab/> },
    {id: 5, name: 'Cart', icon: 'mdi:cart', content: <LoginTab /> },
  ];
      setTab(tabItems);
    } else {
  const tabItems = [
    {id: 0, name: 'Home', icon: 'ic:sharp-home', content: <HomeTab/> },
    {id: 1, name: 'Products', icon: 'bi:tags-fill', content: <ProductsTab /> },
    {id: 2, name: 'News', icon: 'fa6-solid:newspaper', content: <NewsTab /> },
    {id: 3, name: 'Crowd', icon: 'simple-icons:crowdsource', content: <PublicMessages /> },
    {id: 4, name: 'Account', icon: 'mdi:badge-account-horizontal', content: <ReusableFlexLayout
      childA={() => <Ads/>}
      childB={() => <ReusableTabs tabs={tabItms} />}
      childC={() => <Ads/>}
    /> },
    {id: 5, name: 'Cart', icon: 'mdi:cart', content: <CartTab/> },
  ];
      setTab(tabItems);
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router]);
  
  if (isLoading) return <Loading />;
 
  ReusableFlexLayout


  return (
    <Suspense fallback={<Loading />}>
      <ReusableSwiperTabs tabs={usetab} tabsB={Details}/>
    </Suspense>
  );
}
