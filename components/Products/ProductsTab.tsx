'use client'
import React from 'react'
import Menu from '../Partial/Menu'
import Products from './Products'
//import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import ReusableSwipeMenu from 'components/Reusable/ReusableSwipeMenu';
const ProductsTab = () => {
  const menu = [{ label: "Dashboard", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/logout" },
];
  return (
    <ReusableSwipeMenu menuItems={menu} 
                           menu={()=>(<Menu/>)} 
                           main={()=>(<Products/>)}/>
  )
}

export default ProductsTab
