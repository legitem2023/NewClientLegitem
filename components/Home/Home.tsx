import { useQuery } from '@apollo/client';
import Carousel from 'components/Carousel';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import SliderModels from './SliderModels';
import Menu from 'components/Partial/Menu';
import { GET_CATEGORY } from 'graphql/queries';
import React from 'react'

const Home = () => {
    const { data:Category, loading, error } = useQuery(GET_CATEGORY);
    if(loading) return <Loading/>
    if(error) return "Connection Error";
  return (
    <ReusableCenterLayout
      child1={()=>(         <Carousel data={Category?.getCategory} fromData={"Category"}></Carousel>
      )}
      child2={()=>(
        <SliderModels/>
      )}
      child3={()=>(<></>)}
      child4={()=>(<></>)}
    />
  )
}

export default Home
