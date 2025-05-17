import { Icon } from '@iconify/react';
import Ratings from 'components/Partial/Ratings/Ratings';
import Discounted from 'components/UI/Discounted';
import Element from 'components/UI/Element';
import Name from 'components/UI/Name';
import Price from 'components/UI/Price';
import Price_strike from 'components/UI/Price_strike';
import ReusableLabel from 'components/Reusable/ReusableLabel';
import ReusableCard from 'components/Reusable/ReusableCard';
import Sold from 'components/UI/Sold';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setViewedProd } from 'Redux/viewedProdSlice';
import { formatter, imageSource } from 'utils/scripts';

const RelatedProducts = ({ data }: { data: any[] }) => {
  const [take, setTake] = useState(10);
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

  useEffect(() => {
    setLoading(false);
  }, [take]);

  const LoadMoreData = () => {
    setTake((prev) => prev + 5);
    setLoading(true);
  };

  const view = (item: any) => {
    dispatch(setViewedProd([item]));
  };

  return (
    <div className='MainView_Rchild'>
      <ReusableLabel icn='carbon:chart-relationship' label='Related Product' />
      <div className='MainView_RelatedProducts'>
        <div>
          {data.slice(0, take).map((item: any, idx) => (
            <ReusableCard
              key={item.id || idx}
              item={item}
              view={() => view(item)}
              imageSource={() => imageSource(item)}
              handleError={handleError}
              handleLoading={handleLoading}
            />
          ))}
        </div>
        <div className='LoadmoreContainer'>
          {data.length <= take ? (
            <button className='universalINActiveButton'>End of Data</button>
          ) : (
            <button onClick={LoadMoreData} className='universalButtonStyle'>
              {useLoading ? <Icon icon='eos-icons:bubble-loading' /> : 'Load More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
