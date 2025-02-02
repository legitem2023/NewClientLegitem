'use client'
import React from 'react';
import ReusableMainLayout from 'components/Layout/ReusableMainLayout';
import Checkout from './Checkout';

const CheckoutBody = () => {
  return (
  <ReusableMainLayout 
  childA={()=>(<></>)} 
  childB={()=>(<Checkout/>)} 
  childC={()=>(<></>)} />
  );
}

export default CheckoutBody;
