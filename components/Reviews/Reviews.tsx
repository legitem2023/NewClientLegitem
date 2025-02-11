'use client'
import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { READ_FEEDBACK } from 'graphql/queries';
import React from 'react'
import Accordion from './Accordion';
import ReusableMainLayout from 'components/Layout/ReusableMainLayout';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';

const Reviews: React.FC = () => {
    const { data: feedBackData, loading: feedBackLoading, error: feedBackError } = useQuery(READ_FEEDBACK);
    if(feedBackLoading) return <Loading/>
    if(feedBackError) return
  return (
    <ReusableCenterLayout child1={()=>(<Accordion data={feedBackData} />)} child2={()=>(<></>)} child3={()=>(<></>)} child4={()=>(<></>)} />
  )
}

export default Reviews