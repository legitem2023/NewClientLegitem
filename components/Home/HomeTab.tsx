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
import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import Home from './Home'
import Ads from 'components/Ads/Ads';

const HomeTab:React.FC = () => {
const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
  return (
     <ReusableFlexLayout 
     childA={()=>(<Ads/>)} 
     childB={()=>(<Home/>)}
     childC={()=>(<Ads/>)}/>
  )
}

export default HomeTab
