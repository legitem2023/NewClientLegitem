'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
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

  if(newOrderLoading) return <Loading/> 
  if(recievedOrderLoading) return <Loading/>
  if(packedOrderLoading) return <Loading/>
  if(logisticOrderLoading) return <Loading/>
  if(deliverOrderLoading) return <Loading/>
  if(deliveredOrderLoading) return <Loading/>
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


  return (
    <ReusableMainLayout childA={()=>(
<AccountMenu />
    )} childB={()=>(
      // <div className='OrderDetails'>
      <div className='OrderList'>
      <ReusableLabel icn="bxs:basket" label="Order Status"/>
        <div className='OrderStages'>
          {
            transactionData.map((item:any,idx:any)=>(
                <span className={item.Class} key={idx} onClick={()=>ClearLocalStorage(item)}>
                    {item.Name === 'New Order'?<OrderStageNotification notification={updateNewOrder}/>:null}
                    {item.Name === 'Recieve'?<OrderStageNotification notification={updateRecieved}/>:null}
                    {item.Name === 'Packed'?<OrderStageNotification notification={updatePacked}/>:null}
                    {item.Name === 'Logistic'?<OrderStageNotification notification={updateLogistic}/>:null}
                    {item.Name === 'Delivery'?<OrderStageNotification notification={updateDelivery}/>:null}
                    {item.Name === 'Delivered'?<OrderStageNotification notification={updateDelivered}/>:null}
                    <Icon icon={item.Image} height='50' width='50'  className='TransactionImage'></Icon>
                </span>                      
            ))
            }
        </div>
        <div>
        {optionalRender()}
        </div>
      {/* </div> */}
     </div>
    )} childC={()=><></>}/>

  )
}

export default PageOrder