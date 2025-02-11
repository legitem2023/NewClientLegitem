import { Icon } from '@iconify/react';
import Ratings from 'components/Partial/Ratings/Ratings';
import Discounted from 'components/UI/Discounted';
import Element from 'components/UI/Element';
import Name from 'components/UI/Name';
import Price from 'components/UI/Price';
import Price_strike from 'components/UI/Price_strike';
import ReusableLabel from 'components/UI/ReusableLabel';
import Sold from 'components/UI/Sold';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setViewedProd } from 'Redux/viewedProdSlice';
import { formatter, imageSource } from 'utils/scripts';
import { RelatedProductsProps } from 'utils/types/types';

const RelatedProducts: React.FC<RelatedProductsProps> = ({ data }) => {
  const path = process.env.NEXT_PUBLIC_PATH;
  const [take, setTake] = useState(10);
  const dispatch = useDispatch();

  const [useLoading, setLoading] = useState(false);

  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  const fallbackImage = `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`;

  // Update dependencies array to include `fallbackImage`
  const handleError = useCallback((event: any) => {
    event.target.src = fallbackImage;
    event.target.srcset = fallbackImage;
  }, [fallbackImage]); // Include `fallbackImage` as a dependency

  const handleLoading = useCallback((event: any) => {
    // Optionally add loading handling logic here
  }, []); // No additional dependencies needed here

  useEffect(() => {
    setLoading(false);
  }, [take]);

  const LoadMoreData = () => {
    setTake(take + 5);
    setLoading(true);
  };

  const view = (item: any) => {
    console.log([item]);
    dispatch(setViewedProd([item]));
  };

  return (
    <div className='MainView_Rchild'>
      <ReusableLabel icn='' label='Related Product'/>
      <div className='MainView_RelatedProducts'>
        <div>
          {data.slice(0, take).map((item: any, idx) => (
            <div key={idx} className='MainView_RelatedProductsThumbs' onClick={() => view(item)}>
              {/* <Link href={`${path}Products/${item.id}`}> */}
              <Image
                src={imageSource(item)}
                height='200'
                width='200'
                quality={1}
                alt={item.id}
                priority
                onError={handleError} // Use memoized error handler
                onClick={handleLoading} // Use memoized loading handler
              />
              {/* </Link> */}
              <div className='thumbnailTextContainer'>
                <Element Label="Name" value={item.name} />
                <Element Label="Color" value={item.color} />
                <Element Label="Size" value={item.size} />
                <Element Label="Sold" value={item.TotalSoldItems ? item.TotalSoldItems : '0'} />
                {item.discount > 0 ? <Price_strike item={item} /> : <Price item={item} />}
                {item.discount > 0 ? <Discounted item={item} /> : ""}
                <div className='Rates'>
                  <div className='ViewsLikes'>
                    <Ratings data={item.TotalRatings > 0 ? item.TotalRatings : 0} count={item} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='LoadmoreContainer'>
          {data.length <= take ? (
            <button className='universalINActiveButton'>End of Data</button>
          ) : (
            <button onClick={() => LoadMoreData()} className='universalButtonStyle'>
              {useLoading === true ? <Icon icon='eos-icons:bubble-loading' /> : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
