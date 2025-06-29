'use client'
import React from 'react'
import Menu from '../Partial/Menu'
import Products from './Products'
import { useSelector } from 'react-redux'
import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout';
//import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
import ReusableSwipeMenu from 'components/Reusable/ReusableSwipeMenu';
import Ads from 'components/Ads/Ads';
const ProductsTab = () => {
  const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
  const menu = [{ label: "Dashboard", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/logout" },
];
  return (
    <ReusableFlexLayout 
       childA={()=>(<Ads/>)}
       childB={()=>(<ReusableSwipeMenu menuItems={menu} 
                           menu={()=>(<Menu/>)} 
                           main={()=>(<Products/>)}/> )}
       childC={()=>(<Ads/>)}
      />
    
  )
}

export default ProductsTab
