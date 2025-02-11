'use client'
import React, { useEffect } from 'react'
import ReviewsBody from 'components/Reviews/ReviewsBody'
import PageHeader from 'components/Partial/Header/PageHeader'
import PageFooter from 'components/Partial/Footer/PageFooter'
const page = () => {

  return (
    <div className='Main'>
      <PageHeader/>
        <ReviewsBody/>
      <PageFooter/>
    </div>
  )
}

export default page