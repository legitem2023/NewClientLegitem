'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Partial/Header/PageHeader';
import PageFooter from '../../components/Partial/Footer/PageFooter';
import { useQuery, useSubscription } from '@apollo/client'
import { READ_ORDERS,READ_ORDERS_RECIEVED,READ_ORDERS_PACKED,READ_ORDERS_LOGISTIC,READ_ORDERS_DELIVER,READ_ORDERS_DELIVERED } from 'graphql/queries'

import AccordionOrders from '../../components/AccordionOrders/AccordionOrders'
import AccordionOrderRecieved from '../../components/AccordionOrders/AccordionOrderRecieved'
import AccordionOrderPacked from '../../components/AccordionOrders/AccordionOrderPacked'
import AccordionOrderLogistic from '../../components/AccordionOrders/AccordionOrderLogistic'
import AccordionOrderDelivered from '../../components/AccordionOrders/AccordionOrderDelivered'
import AccordionOrderDeliver from '../../components/AccordionOrders/AccordionOrderDeliver'
import useOrderStatusNotification from '../../components/Hooks/useOrderStatusNotification'
//import OrderStageNotification from './OrderStageNotification'

import ReusableArrowTabs from '../../components/Reusable/ReusableArrowTabs';

import PageOrder from '../../components/Order/PageOrder';
import PageAccount from '../../components/Account/PageAccount';
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
import { useSelector,useDispatch } from 'react-redux';
import { setorderStage } from 'Redux/orderStageSlice'
export default function Index() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const saved_cookie = useSelector((state:any)=> state.cookie.cookie);
  const router = useRouter();
  
    const { updateNewOrder,
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
          setUpdateDelivered
        } = useOrderStatusNotification();
  const CurrentOrderStage:any = useSelector((state:any)=> state.orderStage.orderStage);//'';//useGlobalState("CurrentOrderStage");
  const cookieEmailAddress = useSelector((state:any)=> state.cookie.cookie);
  const dispatch = useDispatch();

  const { data:newOrder,loading:newOrderLoading,error,refetch:refetchNew} = useQuery(READ_ORDERS,{variables:{emailAddress:cookieEmailAddress.emailAddress}});
  const { data:recievedOrder,loading:recievedOrderLoading,refetch:refetchrecieved} = useQuery(READ_ORDERS_RECIEVED,{variables:{emailAddress:cookieEmailAddress.emailAddress}});
  const { data:packedOrder,loading:packedOrderLoading,refetch:refetchpacked} = useQuery(READ_ORDERS_PACKED,{variables:{emailAddress:cookieEmailAddress.emailAddress}});
  const { data:logisticOrder,loading:logisticOrderLoading,refetch:refetchlogistic} = useQuery(READ_ORDERS_LOGISTIC,{variables:{emailAddress:cookieEmailAddress.emailAddress}});
  const { data:deliverOrder,loading:deliverOrderLoading,refetch:refetchdeliver} = useQuery(READ_ORDERS_DELIVER,{variables:{emailAddress:cookieEmailAddress.emailAddress}});
  const { data:deliveredOrder,loading:deliveredOrderLoading,refetch:refetchdelivered} = useQuery(READ_ORDERS_DELIVERED,{variables:{emailAddress:cookieEmailAddress.emailAddress}});

  

  const optionalRender = () =>{
      if(CurrentOrderStage==='New Order'){
        return <AccordionOrders json={newOrder?.getGroupedOrderHistory}/>
      }
      if(CurrentOrderStage==='Recieved'){
        return <AccordionOrderRecieved json={recievedOrder?.getGroupedOrderHistoryRecieved}/>
      }
      if(CurrentOrderStage==='Packed'){
        return <AccordionOrderPacked json={packedOrder?.getGroupedOrderHistoryPacked}/>
      }
      if(CurrentOrderStage==='Logistic'){
        return <AccordionOrderLogistic json={logisticOrder?.getGroupedOrderHistoryLogistic}/>
      }
      if(CurrentOrderStage==='Delivery'){
        return <AccordionOrderDeliver json={deliverOrder?.getGroupedOrderHistoryDelivery}/>
      }
      if(CurrentOrderStage==='Delivered'){
        return <AccordionOrderDelivered json={deliveredOrder?.getGroupedOrderHistoryDelivered} refetchdelivered={refetchdelivered}/>
      }

  }


  const ClearLocalStorage = (item:any) =>{
    dispatch(setorderStage(item.URL));
    item.Name==='New Order'?ClearStorage(setUpdateNewOrder,"NewOrder"):"";
    item.Name==='Recieve'?ClearStorage(setUpdateRecieved,"Recieved"):"";
    item.Name==='Packed'?ClearStorage(setUpdatePacked,"Packed"):"";
    item.Name==='Logistic'?ClearStorage(setUpdateLogistic,"Logistic"):"";
    item.Name==='Delivery'?ClearStorage(setUpdateDelivery,"Delivery"):"";
    item.Name==='Delivered'?ClearStorage(setUpdateDelivered,"Delivered"):"";
  }


const tabss = [{
icon: "fluent:document-add-24-filled",
content: <AccordionOrders json={newOrder?.getGroupedOrderHistory}/>,
notification:updateNewOrder
 },{ 
icon: "mdi:inbox-arrow-down", 
content: <AccordionOrderRecieved json={recievedOrder?.getGroupedOrderHistoryRecieved}/>,
notification:updateRecieved
 },{ 
icon: "solar:settings-bold", 
content: <AccordionOrderPacked json={packedOrder?.getGroupedOrderHistoryPacked}/>,
notification:updatePacked
 },{ 
icon: "mdi:truck-cargo-container", 
content:<AccordionOrderLogistic json={logisticOrder?.getGroupedOrderHistoryLogistic}/>,
notification:updateLogistic

},{
icon: "material-symbols:local-shipping", content:<AccordionOrderDeliver json={deliverOrder?.getGroupedOrderHistoryDelivery}/>,
notification:updateDelivery
},{
icon: "mdi:check-decagram", 
content:  <AccordionOrderDelivered json={deliveredOrder?.getGroupedOrderHistoryDelivered} refetchdelivered={refetchdelivered}/>,
notification:updateDelivered
},
]
  
  
  
  
  
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

if(newOrderLoading) return <Loading/> 
  if(recievedOrderLoading) return <Loading/>
  if(packedOrderLoading) return <Loading/>
  if(logisticOrderLoading) return <Loading/>
  if(deliverOrderLoading) return <Loading/>
  if(deliveredOrderLoading) return <Loading/>
 // if(error) return <ReusableServerDown/>;
  refetchNew();
  refetchrecieved();
  refetchpacked();
  refetchlogistic();
  refetchdeliver();
  refetchdelivered();

  
const tabItms = [
    { name: 'Address Book', icon: 'ic:sharp-home', content: <PageAccount userId={saved_cookie.userid}/> },
    { name: 'My Orders', icon: 'bi:tags-fill', content: <ReusableArrowTabs tabs={tabss}/> },
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
