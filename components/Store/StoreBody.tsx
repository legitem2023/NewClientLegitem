'use client'
import React, { useState } from 'react'
import Menu from '../Partial/Menu'
import Products from '../Products/Products'
import Carousel from 'components/Carousel'
import { Icon } from '@iconify/react'
import Commercial3DModel from 'components/Partial/ThreeJS/Commercial3DModel'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY } from 'graphql/queries'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import Store from './Store'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'

const StoreBody = () => {

  return (
    <ReusableMainLayout
    childA={()=>(<Menu/>)}
    childB={()=>(
        <Store/>
    )}
    childC={()=>(<></>)}
    ></ReusableMainLayout>
  )
}

export default StoreBody
