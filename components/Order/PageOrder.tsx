'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu';
import OrderLoading from './OrderLoading';
import ReusableArrowTabs from 'components/UI/ReusableArrowTabs';

import transactionData from '../../json/transactionStages_client.json'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery, useSubscription } from '@apollo/client'
import { READ_ORDERS,READ_ORDERS_RECIEVED,READ_ORDERS_PACKED,READ_ORDERS_LOGISTIC,READ_ORDERS_DELIVER,READ_ORDERS_DELIVERED } from 'graphql/queries'
import { cookies } from 'components/cookies/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import AccordionOrders from 'components/AccordionOrders/AccordionOrders'
import AccordionOrderRecieved from 'components/AccordionOrders/AccordionOrderRecieved'
import AccordionOrderPacked from 'components/AccordionOrders/AccordionOrderPacked'
import AccordionOrderLogistic from 'components/AccordionOrders/AccordionOrderLogistic'
import AccordionOrderDelivered from 'components/AccordionOrders/AccordionOrderDelivered'
import AccordionOrderDeliver from 'components/AccordionOrders/AccordionOrderDeliver'
import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification'
import OrderStageNotification from './OrderStageNotification'
import { ClearStorage } from 'utils/scripts'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import ReusableLabel from 'components/UI/ReusableLabel'
import { useDispatch, useSelector } from 'react-redux'
import { setorderStage } from 'Redux/orderStageSlice'
import ReusableServerDown from 'components/UI/ReusableServerDown'

const PageOrder:React.FC = () => {
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

  if(newOrderLoading) return <OrderLoading/> 
  if(recievedOrderLoading) return <OrderLoading/>
  if(packedOrderLoading) return <OrderLoading/>
  if(logisticOrderLoading) return <OrderLoading/>
  if(deliverOrderLoading) return <OrderLoading/>
  if(deliveredOrderLoading) return <OrderLoading/>
  if(error) return <ReusableServerDown/>;
  refetchNew();
  refetchrecieved();
  refetchpacked();
  refetchlogistic();
  refetchdeliver();
  refetchdelivered();

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


const tabs = [{
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
];


  return (
    <ReusableMainLayout childA={()=>(
<AccountMenu />
    )} childB={()=>(
       <ReusableArrowTabs tabs={tabs}/>
    )} childC={()=><></>}/>

  )
}

export default PageOrder
