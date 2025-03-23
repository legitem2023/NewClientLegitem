import Image from 'next/image';
import Element from './Element';
import Ratings from '../Partial/Ratings/Ratings';
interface ReusableCardProps {
  item: any;
  view: (item: any) => void;
  imageSource: (item: any) => string;
  handleError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleLoading: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ReusableCard: React.FC<ReusableCardProps> = ({ item, view, imageSource, handleError, handleLoading }) => {
  return (
    <div key={item.id} className='MainView_RelatedProductsThumbs' onClick={() => view(item)}>
      <Image
        src={imageSource(item)}
        height={200}
        width={200}
        quality={1}
        alt={item.id}
        priority
        onError={handleError}
        onClick={handleLoading}
      />
      <div className='thumbnailTextContainer'>
        <Element Label="Name" value={item.name} />
        <Element Label="Color" value={item.color} />
        <Element Label="Size" value={item.size} />
        <Element Label="Sold" value={item.TotalSoldItems ? item.TotalSoldItems : '0'} />
        {item.discount > 0 ? <Price_strike item={item} /> : <Price item={item} />}
        {item.discount > 0 && <Discounted item={item} />}
        <div className='Rates'>
          <div className='ViewsLikes'>
            <Ratings data={item.TotalRatings > 0 ? item.TotalRatings : 0} count={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableCard;