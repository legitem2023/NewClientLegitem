'use client'
import React from 'react'
import Menu from '../Partial/Menu'
import Products from './Products'
import { useSelector } from 'react-redux'
import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout';
//import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
import ReusableSwipeMenu from 'components/Reusable/ReusableSwipeMenu';
const ProductsTab = () => {
  const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
  const menu = [{ label: "Dashboard", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/logout" },
];
  return (
    <ReusableFlexLayout 
       childA={()=>(<ReusableSlideNames data={storeproductType} />)}
       childB={()=>(<ReusableSwipeMenu menuItems={menu} 
                           menu={()=>(<Menu/>)} 
                           main={()=>(<Products/>)}/> )}
       childC={()=>(<ReusableSlideNames data={storeproductType} />)}
      />
    
  )
}

export default ProductsTab
