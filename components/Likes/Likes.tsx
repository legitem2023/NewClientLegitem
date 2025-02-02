'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
import LikesData from './LikesData'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'

const Likes:React.FC = () => {
  return (
    <ReusableMainLayout 
    childA={()=>(<AccountMenu />)} 
    childB={()=>(<LikesData/>)} 
    childC={()=><></>}/>
  )
}

export default Likes