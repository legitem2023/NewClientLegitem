'use client'
import React from 'react'
import Messages from './Messages'
import ActiveUsers from './ActiveUsers'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import { useSelector } from 'react-redux'

const PersonalMessages = () => {
    const cookie = useSelector((state:any)=> state.cookie.cookie);
    const SelectedReciever = useSelector((state:any)=> state.reciever.reciever);

    return (
        <ReusableMainLayout
            childA={()=><ActiveUsers email={SelectedReciever}/>}
            childB={()=>(<Messages reciever={SelectedReciever}/>
            )}
            childC={()=><></>}
        />
    )
}

export default PersonalMessages