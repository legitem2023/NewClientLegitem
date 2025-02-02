'use client'
import NewsData from 'components/News/NewsData'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { cookies } from 'components/cookies/cookie'
import React, { useEffect, useState } from 'react'

const News = () => {
  useEffect(() => {
    cookies();
  }, [cookies]);
  return (
    <div className='Main'>
      <PageHeader/>
        <NewsData/>
      <PageFooter/>
    </div>
  )
}

export default News