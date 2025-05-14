import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Ratings from 'components/Partial/Ratings/Ratings'; // Assume you have a Ratings component
import { formatter, imageSource } from 'utils/scripts'; // Assuming you have utilities for formatting and image source
import LikeCmd from '../Commands/LikeCmd';
import AddCartCmd from '../Commands/AddCartCmd';
import Optional3D from 'components/Commands/Optional3D';
import Discounted_ from 'components/Commands/Discounted';
import Price from '../UI/Price';
import Price_strike from '../UI/Price_strike';
import Discounted from '../UI/Discounted';
import Name from '../UI/Name';
import Sold from '../UI/Sold';
import Element from '../UI/Element';
import Element_Title from '../UI/Element_Title';
import { CldImage } from 'next-cloudinary';
type ReusableThumbnailProps = {
  item: any;
  path: string;
  addcart:()=>ReactNode;
  view: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleLoading: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void; // Updated to accept the event
}
const ReusableThumbnail: React.FC<ReusableThumbnailProps> = ({ 
  item, 
  path, 
  addcart,
  view,
  handleLoading, 
  handleError, 
}) => {
  return (
    <div className="thumbnail" >
      <div className="thumbnailImageContainer">
        {item.model===null?"":(<Optional3D/>)}
          <Image
            src={imageSource(item)}
            style={{filter:item.stock < 1?'grayscale(100%) blur(3px)':''}}
            loading='lazy'
            height="200"
            width="200"
            quality={100}
            alt={item.id}
            onClick={view}
            onError={handleError}
            className="thumbnailImage"
          />
      </div>
      <div className="thumbnailTextContainer">
        <Element_Title Label="Name" value={item.name} />
        <Element Label="Size" value={item.size===""?"No Data":item.size} />
        <Element Label="Color" value={item.color===""?"No Data":item.color} />
        {item.discount > 0?(<Price_strike item={item}/>):(<Price item={item}/>)}  
        <div className='Thumbnails_rating_cart'>
          <span>
            <Ratings data={item.TotalRatings > 0 ? item.TotalRatings : 0} count={item}/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReusableThumbnail;
