'use client'
import Menu from 'components/Partial/Menu'
import React from 'react'
//import { ViewGallery } from 'components/Gallery/ViewGallery'
// import { useGlobalState } from 'state'
import { Icon } from '@iconify/react'
import Carousel from 'components/Carousel'
import Commercial3DModel from 'components/Partial/ThreeJS/Commercial3DModel'
import ThreeJS from 'components/Partial/ThreeJS/ThreeJS'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY } from 'graphql/queries'
import { useSelector } from 'react-redux'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
import Home from './Home'
const HomeTab:React.FC = () => {

  return (
     <ReusableMainLayout childA={()=>(<></>)} 
     childB={()=>(<Home/>
     )}
     childC={()=><></>}/>
  )
}

export default HomeTab
