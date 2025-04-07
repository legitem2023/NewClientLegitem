import { useQuery } from '@apollo/client';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import ReusableServerDown from 'components/UI/ReusableServerDown';
import UniversalContainerItem_Likes from 'components/UI/UniversalContainerItem_Likes';
import ReusableCard from 'components/UI/ReusableCard';
import { READ_LIKES } from 'graphql/queries';
import React from 'react'
import { useSelector } from 'react-redux';
import { imageSource } from 'utils/scripts';

const LikesData = () => {
  const path = process.env.NEXT_PUBLIC_PATH

  const cookie = useSelector((state:any)=> state.cookie.cookie);

  const {data:LikeData,loading:LikeLoading,error:LikeError} = useQuery(READ_LIKES,{
    variables:{
      accountEmail:cookie.emailAddress
    }
  });
  if(LikeLoading) return <Loading/> 
  if(LikeError) return <ReusableServerDown/>
  return (
    <ReusableCenterLayout child1={()=><></>} 
    child2={()=>(
      <div className='NewsContainer'>
      {LikeData.readLikes.length > 0?LikeData.readLikes?.map((item: any, idx: number) => (
        <UniversalContainerItem_Likes key={idx} 
                                      item={item} 
                                      title={item.productCode} 
                                      thumbnail={imageSource(item.thumbnail)}  
                                      index={idx}/>
      )):(<h1>No Data</h1>)}
    </div>
    )} child3={()=><></>} child4={()=><></>}/>
  )
}

export default LikesData
