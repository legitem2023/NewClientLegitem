import { useQuery } from '@apollo/client';
import { useEffect,useCallback } from 'react';
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
  const [useLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fallbackImage = `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`;

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.src = fallbackImage;
      event.currentTarget.srcset = fallbackImage;
    },
    [fallbackImage]
  );

  const handleLoading = useCallback(() => {
    // Add custom loading logic if needed
  }, []);

  const LoadMoreData = () => {
    setTake((prev) => prev + 5);
    setLoading(true);
  };

  const view = (item: any) => {
    dispatch(setViewedProd([item]));
  };
  
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
        {/* <UniversalContainerItem_Likes key={idx} 
                                      item={item} 
                                      title={item.productCode} 
                                      thumbnail={imageSource(item.thumbnail)}  
                                      index={idx}/>*/}
        <ReusableCard
              key={idx}
              item={item}
              view={() => {view(item)}}
              imageSource={() => imageSource(item)}
              handleError={() => handleError}
              handleLoading={() => handleLoading}
            />
      )):(<h1>No Data</h1>)}
    </div>
    )} child3={()=><></>} child4={()=><></>}/>
  )
}

export default LikesData
