'use client'
import React from 'react'
import Messages from './Messages'
import { Icon } from '@iconify/react'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import { useSelector } from 'react-redux'

const CrowdMessages = () => {
  const cookie = useSelector((state:any)=> state.cookie.cookie);
    return (
        <ReusableMainLayout
            childA={()=>(
                <></>
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