
"use client";
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import Cookie from 'components/cookies/Cookie';
export default function Account() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
    const cookie = useSelector((state:any)=> state.cookie.cookie);
  
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
        <PageAccount userId={cookie.userid}/>
        <Cookie/>
      <PageFooter/>
    </div>
  )
}
