'use client'
import React from 'react'
import Messages from './Messages'
import ActiveUsers from './ActiveUsers'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import { useSelector } from 'react-redux'
import ReusableSwipeMenu from 'components/Reusable/ReusableSwipeMenu';
const PrivateMessages = () => {
    const cookie = useSelector((state:any)=> state.cookie.cookie);
    const menu = [{ label: "Dashboard", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/logout" },
];
    const SelectedReciever = useSelector((state:any)=> state.reciever.reciever);
    return (
        <ReusableSwipeMenu menuItems={menu} 
                           menu={()=> <ActiveUsers email={SelectedReciever}/> } 
                           main={()=>(<Messages/>)}/>
        />
    )
}

export default PrivateMessages
