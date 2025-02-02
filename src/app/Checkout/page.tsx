'use client'
import React, { useEffect, useState } from 'react'
import PageHeader from 'components/Partial/Header/PageHeader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutBody from 'components/Checkout/CheckoutBody'
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie';
import Loading from 'components/Partial/LoadingAnimation/Loading';
const Checkout = () => {
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

  if (isLoading) {
    return <Loading/>; // Show loading state while checking
  }
  return (
    <div className='Main'>
      <PageHeader/>
        <CheckoutBody/>
        <ToastContainer/>
    </div>
  )
}

export default Checkout