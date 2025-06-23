'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
/*
import {
  READ_ORDERS,
  READ_ORDERS_RECIEVED,
  READ_ORDERS_PACKED,
  READ_ORDERS_LOGISTIC,
  READ_ORDERS_DELIVER,
  READ_ORDERS_DELIVERED,
} from 'graphql/queries';
*/
//import AccordionOrders from 'components/AccordionOrders/AccordionOrders';
//import AccordionOrderRecieved from 'components/AccordionOrders/AccordionOrderRecieved';
//import AccordionOrderPacked from 'components/AccordionOrders/AccordionOrderPacked';
//import AccordionOrderLogistic from 'components/AccordionOrders/AccordionOrderLogistic';
//import AccordionOrderDeliver from 'components/AccordionOrders/AccordionOrderDeliver';
//import AccordionOrderDelivered from 'components/AccordionOrders/AccordionOrderDelivered';

//import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification';
//import ReusableArrowTabs from 'components/Reusable/ReusableArrowTabs';
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
//import { cookies } from 'components/cookies/cookie';
//import { setorderStage } from 'Redux/orderStageSlice';
//import { ClearStorage } from 'utils/scripts';

export default function Index() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //const router = useRouter();
  //const dispatch = useDispatch();
  //const saved_cookie = useSelector((state: any) => state.cookie.cookie);
  //const cookieEmailAddress = saved_cookie?.emailAddress;
  //const CurrentOrderStage = useSelector((state: any) => state.orderStage.orderStage);

  const tabItms = [
    { name: 'Address Book', icon: 'ic:sharp-home', content: <PageAccount userId={saved_cookie.userid} /> },
    { name: 'My Orders', icon: 'bi:tags-fill', content: <></> },
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
