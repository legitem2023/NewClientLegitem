import { useQuery } from '@apollo/client';
import Carousel from 'components/Carousel';
import HomeGallery from 'components/Gallery/HomeGallery';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import SliderModels from './SliderModels';
import Menu from 'components/Partial/Menu';
import { GET_CATEGORY } from 'graphql/queries';
import React from 'react'
import ReusableLabel from 'components/Reusable/ReusableLabel';
import HomeLoading from './HomeLoading';
import ReusableCustomCarousel from 'components/Reusable/ReusableCustomCarousel';

const Home = () => {
    
    const { data:Category, loading, error } = useQuery(GET_CATEGORY);
    if(loading) return <HomeLoading/>
    if(error) return "Connection Error";

    const gallery = Category?.getCategory;

    
  return (
    <ReusableCenterLayout
      child1={()=>(
        <div className='homeContainer'>
          <SliderModels/>
        </div>
      )}
      child2={()=>(         
        <div className='homeContainer'>
          <ReusableLabel icn='nrk:category-active' label='Shop by Category'/>
          <Carousel data={Category?.getCategory} fromData={"Category"}></Carousel>
        </div>
      )}
      child3={()=>(
        <div className='homeContainer'>          
          <ReusableLabel icn='bi:shop' label='Our Merchants'/>
          <Carousel data={Category?.getCategory} fromData={"Category"}></Carousel>
            <HomeGallery/>
        </div>
        
      )}
      child4={()=>(
        <div className='homeContainer'>
        <ReusableLabel icn='carbon:recently-viewed' label='Recommended for You'/>
        <ReusableCustomCarousel data={Category?.getCategory} showthumbs={true} thumbpos="bottom"/>
      </div>
      )}
      
    />
  )
}

export default Home
