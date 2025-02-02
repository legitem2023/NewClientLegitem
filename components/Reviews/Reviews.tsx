'use client'
import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { READ_FEEDBACK } from 'graphql/queries';
import React from 'react'
import Accordion from './Accordion';
import ReusableMainLayout from 'components/Layout/ReusableMainLayout';

const Reviews: React.FC = () => {
    const { data: feedBackData, loading: feedBackLoading, error: feedBackError } = useQuery(READ_FEEDBACK);
    if(feedBackLoading) return <Loading/>
    if(feedBackError) return
  return (
    <ReusableMainLayout childA={()=>(<></>)} childB={()=>(<Accordion data={feedBackData} />)} childC={()=>(<></>)}/>

  )
}

export default Reviews