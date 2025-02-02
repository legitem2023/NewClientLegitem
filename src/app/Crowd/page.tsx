'use client'
import React, { useEffect, useState } from 'react'
import CrowdMessages from 'components/Crowd/CrowdMessages'
import PageHeader from '../../../components/Partial/Header/PageHeader'
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import { cookies } from 'components/cookies/cookie'
import { useRouter } from 'next/navigation'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import LoadActiveUsers from 'components/Partial/Header/LoadActiveUsers'
import Cookie from 'components/cookies/Cookie'
import CrowdLoading from 'components/Crowd/CrowdLoading'
import CookieLoading from './CookieLoading'

const Crowd = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false); // End loading state
  }, [router]);



  return (
    <div className='Main'>
      <PageHeader />
      {/* <LoadActiveUsers/> */}
      {isLoading ? <CookieLoading /> : <CrowdMessages />}
      
      <PageFooter />
    </div>
  )
};

export default Crowd;
