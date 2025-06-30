import React, { useEffect, useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import LikesLoading from './LikesLoading';
import ReusableServerDown from 'components/Reusable/ReusableServerDown';
import ReusableLikeCard from 'components/Reusable/ReusableLikeCard';
import { READ_LIKES } from 'graphql/queries';
import { setViewedProd } from 'Redux/viewedProdSlice';
import { imageSource } from 'utils/scripts';
import AddCartCmd from 'components/Commands/AddCartCmd';
import ReusableLabel from 'components/Reusable/ReusableLabel';
const LikesData = () => {
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const [useLoading, setLoading] = useState(false);

  const fallbackImage = `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`;

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.src = fallbackImage;
      event.currentTarget.srcset = fallbackImage;
    },
    [fallbackImage]
  );

  const handleLoading = useCallback(() => {
    // Optional: add logic here
  }, []);

  const view = (item: any) => {
   // dispatch(setViewedProd([item]));
  };

  const { data: LikeData, loading: LikeLoading, error: LikeError } = useQuery(READ_LIKES, {
    variables: {
      accountEmail: cookie.emailAddress,
    },
  });

  if (LikeLoading) return <LikesLoading/>;
  if (LikeError) return <ReusableServerDown />;
  return (
    <ReusableCenterLayout
      child1={() => (<ReusableLabel icn="bi:tags-fill" label="Likes" />)}
      child2={() => (
        <div
          style={{ overflowY: 'auto', height: 'auto', scrollbarWidth: 'none' }} // Set height to auto
        >
        <div className="LikeContainer">
          {LikeData?.readLikes?.length > 0 ? (
            LikeData.readLikes.map((item: any, idx: number) => (
              <ReusableLikeCard
                key={idx}
                item={item}
                view={() => view(item)}
                imageSource={() => imageSource(item)}
                handleError={handleError}
                handleLoading={handleLoading}
                childA={()=><AddCartCmd item={item}/>}
              />
            ))
          ) : (
            <h1>No Data</h1>
          )}
        </div>
        </div>
      )}
      child3={() => <></>}
      child4={() => <></>}
    />
  );
};

export default LikesData;
