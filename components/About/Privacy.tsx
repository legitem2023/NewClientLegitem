import React from 'react'
import PrivacyPolicy from './PrivacyPolicy'
import privacyPolicyData from 'json/Private.json'
import { Icon } from '@iconify/react'
import { READ_DISCLAIMER, READ_PRIVACY } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import ReusableBody from 'components/Reusable/ReusableBody'
const Privacy = () => {
  const { data, loading,error } = useQuery(READ_PRIVACY);
  if(loading) return <Loading/>
  if(error) return "Connection Error";
  return (
        <ReusableBody
        childA={()=>""}
        childB={()=>(
          <PrivacyPolicy data={data} />
        )}
        childC={()=>""}/>
  )
}

export default Privacy