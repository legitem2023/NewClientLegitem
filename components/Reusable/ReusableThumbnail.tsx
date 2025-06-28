// components/ReusableThumbnail.tsx
import React from 'react';
import Image from 'next/image';
import Ratings from 'components/Partial/Ratings/Ratings';
import Optional3D from 'components/Commands/Optional3D';
import Price from '../UI/Price';
import Price_strike from '../UI/Price_strike';
import Element from '../UI/Element';
import Element_Title from '../UI/Element_Title';
import { imageSource } from 'utils/scripts';

type ItemType = {
  id: string;
  name: string;
  size: string;
  color: string;
  stock: number;
  discount: number;
  TotalRatings: number;
  model: any;
};

type ReusableThumbnailProps = {
  item: ItemType;
  path: string;
  addcart: () => React.ReactNode;
  view: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleLoading: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

const ReusableThumbnail: React.FC<ReusableThumbnailProps> = React.memo(
  ({ item, path, addcart, view, handleLoading, handleError }) => {
    const renderPrice = () =>
      item.discount > 0 ? <Price_strike item={item} /> : <Price item={item} />;

    return (
      <div className="thumbnail">
        <div className="thumbnailImageContainer">
          {item.model && <Optional3D />}
          <Image
            src={imageSource(item)}
            alt={item.id}
            height={200}
            width={200}
            quality={100}
            loading="lazy"
            onClick={view}
            onLoad={handleLoading}
            onError={handleError}
            className="thumbnailImage"
            style={{ filter: item.stock < 1 ? 'grayscale(100%)' : 'none' }}
          />
        </div>

        <div className="thumbnailTextContainer">
          <Element_Title Label="Name" value={item.name || 'No Name'} />
          <Element Label="Size" value={item.size || 'No Size'} />
          <Element Label="Color" value={item.color || 'No Color'} />
          {renderPrice()}
          <div className="Thumbnails_rating_cart">
            <span>
              <Ratings
                data={item.TotalRatings > 0 ? item.TotalRatings : 0}
                count={item}
              />
            </span>
            {addcart()}
          </div>
        </div>
      </div>
    );
  }
);

ReusableThumbnail.displayName = 'ReusableThumbnail';

export default ReusableThumbnail;
