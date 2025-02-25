'use client'
import React from 'react'
import Messages from './Messages'
import { Icon } from '@iconify/react'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import { useSelector } from 'react-redux'
import ActiveUsers from 'components/PersonalMessages/ActiveUsers';
const CrowdMessages = () => {
  const cookie = useSelector((state:any)=> state.cookie.cookie);
    return (
        <ReusableMainLayout
            childA={()=>(
                <ActiveUsers email={cookie.emailAddress}/>
            )}
            childB={()=>(
                <Messages />
            )}
            childC={()=><></>}
        >
        </ReusableMainLayout>
    )
}

export default CrowdMessages
