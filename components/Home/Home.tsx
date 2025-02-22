import { useQuery } from '@apollo/client';
import Carousel from 'components/Carousel';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import SliderModels from './SliderModels';
import Menu from 'components/Partial/Menu';
import { GET_CATEGORY } from 'graphql/queries';
import React from 'react'
import ReusableLabel from 'components/UI/ReusableLabel';

const Home = () => {
    const { data:Category, loading, error } = useQuery(GET_CATEGORY);
    if(loading) return <Loading/>
    if(error) return "Connection Error";
  return (
    <ReusableCenterLayout
      child1={()=>(         
        <div className='homeContainer'>
          <ReusableLabel icn='nrk:category-active' label='Categories'/>
          <Carousel data={Category?.getCategory} fromData={"Category"}></Carousel>
        </div>
      )}
      child2={()=>(
        <div className='homeContainer'>
          <ReusableLabel icn='iconoir:select-face-3d' label='3D Model'/>
          <SliderModels/>
        </div>
        
      )}
      child3={()=>(
        <div className='homeContainer'>
        <ReusableLabel icn='carbon:recently-viewed' label='Most Viewed'/>
      </div>
      )}
      child4={()=>(<></>)}
    />
  )
}

export default Home
