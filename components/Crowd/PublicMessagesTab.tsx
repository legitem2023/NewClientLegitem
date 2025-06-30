
'use client'
import React from 'react'
import Messages from './Messages'
//import ActiveUsers from './ActiveUsers'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import { useSelector } from 'react-redux'
import ReusableSwipeMenu from 'components/Reusable/ReusableSwipeMenu';
import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import Ads from 'components/Ads/Ads'
const PublicMessagesTab = () => {
    const cookie = useSelector((state:any)=> state.cookie.cookie);
    const menu = [{ label: "Dashboard", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/logout" },
];
    const SelectedReciever = useSelector((state:any)=> state.reciever.reciever);
    return (
                           <ReusableFlexLayout 
                           childA={()=>(<Ads/>)}
                           childB={()=>(<ReusableSwipeMenu menuItems={menu} 
                            menu={()=>(<></>)} 
                            main={()=>(<Messages/>)}/>)} 
                           childC={()=>(<Ads/>)}/>
    )
}

export default PublicMessagesTab
