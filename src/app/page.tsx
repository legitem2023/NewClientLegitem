'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import {
  READ_ORDERS,
  READ_ORDERS_RECIEVED,
  READ_ORDERS_PACKED,
  READ_ORDERS_LOGISTIC,
  READ_ORDERS_DELIVER,
  READ_ORDERS_DELIVERED,
} from 'graphql/queries';

import AccordionOrders from 'components/AccordionOrders/AccordionOrders';
import AccordionOrderRecieved from 'components/AccordionOrders/AccordionOrderRecieved';
import AccordionOrderPacked from 'components/AccordionOrders/AccordionOrderPacked';
import AccordionOrderLogistic from 'components/AccordionOrders/AccordionOrderLogistic';
import AccordionOrderDeliver from 'components/AccordionOrders/AccordionOrderDeliver';
import AccordionOrderDelivered from 'components/AccordionOrders/AccordionOrderDelivered';

import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification';
import ReusableArrowTabs from 'components/Reusable/ReusableArrowTabs';
import PageOrder from 'components/Order/PageOrder';
import PageAccount from 'components/Account/PageAccount';
import Products from 'components/Products/Products';
import News from 'components/News/News';
import CartBody from 'components/Cart/CartBody';
import Messages from 'components/Crowd/Messages';
import Home from 'components/Home/Home';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableSwiperTabs from 'components/Layout/ReusableSwiperTabs';
import ReusableTabs from 'components/Reusable/ReusableTabs';
import { cookies } from 'components/cookies/cookie';
import { setorderStage } from 'Redux/orderStageSlice';
import { ClearStorage } from 'utils/scripts';

export default function Index() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const saved_cookie = useSelector((state: any) => state.cookie.cookie);
  const cookieEmailAddress = saved_cookie?.emailAddress;
  const CurrentOrderStage = useSelector((state: any) => state.orderStage.orderStage);

  const {
    updateNewOrder,
    updateRecieved,
    updatePacked,
    updateLogistic,
    updateDelivery,
    updateDelivered,
    setUpdateNewOrder,
    setUpdateRecieved,
    setUpdatePacked,
    setUpdateLogistic,
    setUpdateDelivery,
    setUpdateDelivered,
  } = useOrderStatusNotification();

  const { data: newOrder, loading: newOrderLoading, refetch: refetchNew } = useQuery(READ_ORDERS, {
    variables: { emailAddress: cookieEmailAddress },
  });
  const { data: recievedOrder, loading: recievedOrderLoading, refetch: refetchrecieved } = useQuery(
    READ_ORDERS_RECIEVED,
    { variables: { emailAddress: cookieEmailAddress } }
  );
  const { data: packedOrder, loading: packedOrderLoading, refetch: refetchpacked } = useQuery(
    READ_ORDERS_PACKED,
    { variables: { emailAddress: cookieEmailAddress } }
  );
  const { data: logisticOrder, loading: logisticOrderLoading, refetch: refetchlogistic } = useQuery(
    READ_ORDERS_LOGISTIC,
    { variables: { emailAddress: cookieEmailAddress } }
  );
  const { data: deliverOrder, loading: deliverOrderLoading, refetch: refetchdeliver } = useQuery(
    READ_ORDERS_DELIVER,
    { variables: { emailAddress: cookieEmailAddress } }
  );
  const { data: deliveredOrder, loading: deliveredOrderLoading, refetch: refetchdelivered } = useQuery(
    READ_ORDERS_DELIVERED,
    { variables: { emailAddress: cookieEmailAddress } }
  );

  const tabss = [
    {
      icon: 'fluent:document-add-24-filled',
      content: <AccordionOrders json={newOrder?.getGroupedOrderHistory} />,
      notification: updateNewOrder,
    },
    {
      icon: 'mdi:inbox-arrow-down',
      content: <AccordionOrderRecieved json={recievedOrder?.getGroupedOrderHistoryRecieved} />,
      notification: updateRecieved,
    },
    {
      icon: 'solar:settings-bold',
      content: <AccordionOrderPacked json={packedOrder?.getGroupedOrderHistoryPacked} />,
      notification: updatePacked,
    },
    {
      icon: 'mdi:truck-cargo-container',
      content: <AccordionOrderLogistic json={logisticOrder?.getGroupedOrderHistoryLogistic} />,
      notification: updateLogistic,
    },
    {
      icon: 'material-symbols:local-shipping',
      content: <AccordionOrderDeliver json={deliverOrder?.getGroupedOrderHistoryDelivery} />,
      notification: updateDelivery,
    },
    {
      icon: 'mdi:check-decagram',
      content: (
        <AccordionOrderDelivered
          json={deliveredOrder?.getGroupedOrderHistoryDelivered}
          refetchdelivered={refetchdelivered}
        />
      ),
      notification: updateDelivered,
    },
  ];

  const tabItms = [
    { name: 'Address Book', icon: 'ic:sharp-home', content: <PageAccount userId={saved_cookie.userid} /> },
    { name: 'My Orders', icon: 'bi:tags-fill', content: <ReusableArrowTabs tabs={tabss} /> },
    { name: 'Likes', icon: 'fa6-solid:newspaper', content: <News /> },
    { name: 'Messages', icon: 'simple-icons:crowdsource', content: <Messages /> },
    { name: 'Logout', icon: 'mdi:badge-account-horizontal', content: <CartBody /> },
  ];

  const tabItems = [
    { name: 'Home', icon: 'ic:sharp-home', content: <Home /> },
    { name: 'Products', icon: 'bi:tags-fill', content: <Products /> },
    { name: 'News', icon: 'fa6-solid:newspaper', content: <News /> },
    { name: 'Crowd', icon: 'simple-icons:crowdsource', content: <Messages /> },
    { name: 'Account', icon: 'mdi:badge-account-horizontal', content: <ReusableTabs tabs={tabItms} /> },
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
  if (
    newOrderLoading ||
    recievedOrderLoading ||
    packedOrderLoading ||
    logisticOrderLoading ||
    deliverOrderLoading ||
    deliveredOrderLoading
  )
    return <Loading />;

  // Refetch updated data
  refetchNew();
  refetchrecieved();
  refetchpacked();
  refetchlogistic();
  refetchdeliver();
  refetchdelivered();

  return (
    <Suspense fallback={<Loading />}>
      <ReusableSwiperTabs tabs={tabItems} />
    </Suspense>
  );
     }
