'use client';

import { useSubscription } from '@apollo/client';
import { ORDER_STATUS_SUBSCRIPTION } from 'graphql/subscriptions';
import { useState, useEffect } from 'react';
import { useNotification } from 'components/context/NotificationContext';
// import { useGlobalState } from 'state';
import { PushNotification } from 'components/Notification/PushNotification';
import { useSelector } from 'react-redux';

const OrderStatusNotification = () => {
  const { showNotification } = useNotification();
    const cookie = useSelector((state:any)=> state.cookie.cookie);
  
  const [updateNewOrder, setUpdateNewOrder] = useState<number>(0);
  const [updateRecieved, setUpdateRecieved] = useState<number>(0);
  const [updatePacked, setUpdatePacked] = useState<number>(0);
  const [updateLogistic, setUpdateLogistic] = useState<number>(0);
  const [updateDelivery, setUpdateDelivery] = useState<number>(0);
  const [updateDelivered, setUpdateDelivered] = useState<number>(0);

  const playSound = async (soundUrl: string) => {
    try {
      const audio = new Audio(soundUrl);
      await audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
      }).catch(error => {
        console.error('Audio context initialization failed:', error);
      });
    } catch (error) {
      console.error('Playback failed:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUpdateNewOrder(parseInt(localStorage.getItem('NewOrder') || '0', 10));
      setUpdateRecieved(parseInt(localStorage.getItem('Recieved') || '0', 10));
      setUpdatePacked(parseInt(localStorage.getItem('Packed') || '0', 10));
      setUpdateLogistic(parseInt(localStorage.getItem('Logistic') || '0', 10));
      setUpdateDelivery(parseInt(localStorage.getItem('Delivery') || '0', 10));
      setUpdateDelivered(parseInt(localStorage.getItem('Delivered') || '0', 10));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const { data, error } = useSubscription(ORDER_STATUS_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.messageToOrder) {
        const filter = subscriptionData.data.messageToOrder.filter((item:any)=>item.emailAddress===cookie.emailAddress);
        filter.forEach((data: any) => {
          PushNotification("Order Messages","Order Notification",data.OrderStatus);
          switch (data.OrderStatus) {
            case 'New Order':
              setUpdateNewOrder(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('NewOrder', newValue.toString());
                  localStorage.removeItem('Recieved');
                  localStorage.removeItem('Packed');
                  localStorage.removeItem('Logistic');
                  localStorage.removeItem('Delivery');
                  localStorage.removeItem('Delivered');
                }
                // playSound('/newNot.mp3');
                // showNotification('New Order', 'A new order has arrived.');
                return newValue;
              });
              break;
            case 'Recieved':
              setUpdateRecieved(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Recieved', newValue.toString());
                  localStorage.removeItem('NewOrder');
                  localStorage.removeItem('Packed');
                  localStorage.removeItem('Logistic');
                  localStorage.removeItem('Delivery');
                  localStorage.removeItem('Delivered');
                }
                // playSound('/newNot.mp3');
                // showNotification('Order Received', 'An order has been received.');
                return newValue;
              });
              break;
            case 'Packed':
              setUpdatePacked(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Packed', newValue.toString());
                  localStorage.removeItem('NewOrder');
                  localStorage.removeItem('Recieved');
                  localStorage.removeItem('Logistic');
                  localStorage.removeItem('Delivery');
                  localStorage.removeItem('Delivered');
                }
                //playSound('/newNot.mp3');
                // showNotification('Order Packed', 'An order has been packed.');
                return newValue;
              });
              break;
            case 'Logistic':
              setUpdateLogistic(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Logistic', newValue.toString());
                  localStorage.removeItem('NewOrder');
                  localStorage.removeItem('Recieved');
                  localStorage.removeItem('Packed');
                  localStorage.removeItem('Delivery');
                  localStorage.removeItem('Delivered');
                }
                //playSound('/newNot.mp3');
                // showNotification('Order in Transit', 'An order is in logistic.');
                return newValue;
              });
              break;
            case 'Delivery':
              setUpdateDelivery(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Delivery', newValue.toString());
                  localStorage.removeItem('NewOrder');
                  localStorage.removeItem('Recieved');
                  localStorage.removeItem('Packed');
                  localStorage.removeItem('Logistic');
                  localStorage.removeItem('Delivered');
                }
                //playSound('/newNot.mp3');
                // showNotification('Out for Delivery', 'An order is out for delivery.');
                return newValue;
              });
              break;
            case 'Delivered':
              setUpdateDelivered(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Delivered', newValue.toString());
                  localStorage.removeItem('NewOrder');
                  localStorage.removeItem('Recieved');
                  localStorage.removeItem('Packed');
                  localStorage.removeItem('Logistic');
                  localStorage.removeItem('Delivery');
                }
                //playSound('/newNot.mp3');
                // showNotification('Order Delivered', 'An order has been delivered.');
                return newValue;
              });
              break;
            default:
              break;
          }
        });
      }
    },
  });

  if (error) {
    console.error('Subscription error:', error);
  }

  return { updateNewOrder, 
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
          };
};

export default OrderStatusNotification;
