'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import Home from './Home'
import Ads from 'components/Ads/Ads'

const HomeTab: React.FC = () => {
  const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData)
  return (
    <ReusableFlexLayout 
      childA={() => (<Ads />)} 
      childB={() => (<Home />)} 
      childC={() => (<Ads />)} 
    />
  )
}

export default HomeTab
