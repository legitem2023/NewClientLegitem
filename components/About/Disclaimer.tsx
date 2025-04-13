import React from 'react'
import DisclaimerJson from 'json/Disclaimer.json'
import { Icon } from '@iconify/react'
import { READ_DISCLAIMER } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import ReusableBody from 'components/Reusable/ReusableBody';
const Disclaimer = () => {
  const { data, loading,error } = useQuery(READ_DISCLAIMER);
  if(loading) return <Loading/>
  if(error) return "Connection Error";
    return (
            <ReusableBody
            childA={()=>""}
            childB={()=>(
            <div>
                          {data?.readDisclaimer?.map((item: any,idx:number) => (
            <div key={idx}>
              <HtmlRenderer htmlContent={item.content}/>
            </div>
          ))}
              </div>
            )}
            childC={()=>""}/>
    );
}

export default Disclaimer