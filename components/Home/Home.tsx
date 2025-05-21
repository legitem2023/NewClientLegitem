'use client'
import { useQuery } from '@apollo/client';
import Carousel from 'components/Carousel';
import HomeGallery from 'components/Gallery/HomeGallery';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import Loading from 'components/Partial/LoadingAnimation/Loading';
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
//import dynamic from 'next/dynamic';
//import ReusableJSSOR from 'components/Reusable/ReusableJSSOR';

const slides = [
  { image: "https://via.placeholder.com/600x400?text=1", thumb: "https://via.placeholder.com/100?text=1" },
  { image: "https://via.placeholder.com/600x400?text=2", thumb: "https://via.placeholder.com/100?text=2" },
  { image: "https://via.placeholder.com/600x400?text=3", thumb: "https://via.placeholder.com/100?text=3" },
  { image: "https://via.placeholder.com/600x400?text=4", thumb: "https://via.placeholder.com/100?text=4" }
];

// Prevent SSR for JssorCarousel
const Home = () => {
    const storedcategory = useSelector((state: any) => state.categoryData.getCategoryData);
    const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
  console.log(storeproductType);
   const { data:Category, loading:CategoryLoading, error } = useQuery(GET_CATEGORY);
    if(CategoryLoading) return <HomeLoading/>
    if(error) return "Connection Error";

 //   const gallery = Category?.getCategory;

    
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
          <Carousel data={storedcategory} fromData={"Category"}></Carousel>
          <ReusableLabel icn='nrk:category-active' label='Brands'/>
          <ReusableSlideNames data={storeproductType} />
          <ReusableLabel icn='nrk:category-active' label='Product Types'/>
          <ReusableSlick data={storedcategory} />
        </div>
      )}
      child3={()=>(
        <div className='homeContainer'>          
          <ReusableLabel icn='bi:shop' label='Our Merchants'/>
          <ReusableCustomCarousel data={storedcategory} showthumbs={true} thumbpos="top"/>
        </div>
        
      )}
      child4={()=>(
        <div className='homeContainer'>
        <ReusableLabel icn='carbon:recently-viewed' label='Recommended for You'/>
        <ReusableCustomCarousel data={storedcategory} showthumbs={true} thumbpos="bottom"/>
      </div>
      )}
      
    />
  )
}

export default Home
