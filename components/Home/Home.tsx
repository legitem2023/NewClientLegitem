'use client'
import { useQuery } from '@apollo/client';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import SliderModels from './SliderModels';
//import Menu from 'components/Partial/Menu';
import { GET_CATEGORY } from 'graphql/queries';
import React from 'react'
import { useSelector } from 'react-redux';
import ReusableLabel from 'components/Reusable/ReusableLabel';
import HomeLoading from './HomeLoading';
import ReusableCustomCarousel from 'components/Reusable/ReusableCustomCarousel';
import ReusableSlick from 'components/Reusable/ReusableSlick';
import ReusableSlickGrid from 'components/Reusable/ReusableSlickGrid';
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';


// Prevent SSR for JssorCarousel
const Home = () => {
    const storedcategory = useSelector((state: any) => state.categoryData.getCategoryData);
    const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
   const { data:Category, loading:CategoryLoading, error } = useQuery(GET_CATEGORY);
    if(CategoryLoading) return <HomeLoading/>
    if(error) return "Connection Error";

 //   const gallery = Category?.getCategory;

  return (
    <ReusableCenterLayout
      child1={()=>(
        <div className='homeContainer'>
          
        </div>
      )}
      child2={()=>(         
        <div className='homeContainer'>
          <ReusableLabel icn='nrk:category-active' label='Mostly Viewed'/>
          {/* <Carousel data={storedcategory} fromData={"Category"}></Carousel>*/}
          <ReusableSlickGrid data={storedcategory}/>
          
          <ReusableLabel icn='nrk:category-active' label='Categories'/>
          <ReusableSlick data={storedcategory} />
          
          <ReusableLabel icn='nrk:category-active' label='Product Types'/>
          <ReusableSlideNames data={storeproductType} />
          
        </div>
      )}
      child3={()=>(
        <div className='homeContainer'>          
          <ReusableLabel icn='bi:shop' label='Our Merchants'/>
          <ReusableCustomCarousel data={storedcategory} showthumbs={true} thumbpos="top"/>
        </div>
        
      )}
      child4={()=>(<></>)}
      
    />
  )
}

export default Home
