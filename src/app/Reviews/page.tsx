'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import FAQ from 'json/faq.json'
import Privacy from 'components/About/Privacy'
import Reviews from 'components/Reviews/Reviews'
import { cookies } from 'components/cookies/cookie'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
const page = () => {

  return (
    <div className='Main'>
        <Reviews/>
    </div>
  )
}

export default page