'use client'
import React from 'react'
import Menu from '../Partial/Menu'
import Products from './Products'
import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout';
//import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import ReusableSwipeMenu from 'components/Reusable/ReusableSwipeMenu';
const ProductsTab = () => {
  const menu = [{ label: "Dashboard", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/logout" },
];
  return (
    <ReusableFlexLayout 
       childA={()=>(<></>)}
       childB={()=>(<ReusableSwipeMenu menuItems={menu} 
                           menu={()=>(<Menu/>)} 
                           main={()=>(<Products/>)}/> )}
       childC={()=>(<></>)}
      />
    
  )
}

export default ProductsTab
