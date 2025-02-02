'use client'
import Menu from 'components/Partial/Menu'
import React from 'react'
import { ViewGallery } from 'components/Gallery/ViewGallery'
// import { useGlobalState } from 'state'
import { Icon } from '@iconify/react'
import Carousel from 'components/Carousel'
import Commercial3DModel from 'components/Partial/ThreeJS/Commercial3DModel'
import ThreeJS from 'components/Partial/ThreeJS/ThreeJS'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY } from 'graphql/queries'
import { useSelector } from 'react-redux'
const HomeBody:React.FC = () => {
  const drawerState = useSelector((state:any)=> state.drawer.drawer);//'';//useGlobalState("drawer");
  const { data:Category, loading, error } = useQuery(GET_CATEGORY);
  if(loading) return <Loading/>
  if(error) return "Connection Error";
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <Menu />
      </div>
      <div className='middlecontainer'>
      <div className='LabelHead carouselLabel'><Icon icon="dashicons:store" /> Stores</div>
        {/* <ViewGallery/> */}
        <div className='carousel'>
          <Carousel data={Category?.getCategory} fromData={'Category'}></Carousel>
        </div>
      </div>
      <div className='RightWing'>

      </div>
    </div>
  )
}

export default HomeBody