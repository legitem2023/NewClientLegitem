import Image from 'next/image';
import Element from './Element';
import Ratings from '../Partial/Ratings/Ratings';
import Discounted from './Discounted';
import Price from './Price';
import Price_strike from './Price_strike';
interface ReusableCardProps {
  item: any;
  view: (item: any) => void;
  imageSource: (item: any) => string;
  handleError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleLoading: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ReusableCard: React.FC<ReusableCardProps> = ({ item, view, imageSource, handleError, handleLoading }) => {
  return (
    <div key={item.id} style={{display:'flex',
                               width:'100%',
                               gap:'2px',
                               margin:'2px',
                               
                               backgroundColor:'#f1f1f1',
                               boxShadow:'0.5px 0.5px 3px #707070',
                               padding:'4px'}} 
                         onClick={() => view(item)}>
      <div style={{flex:1,
                   backgroundColor:'#f1f1f1'}}>
        <Image
        src={imageSource(item)}
        height={150}
        width={150}
        quality={1}
        alt={item.id}
        priority
        onError={handleError}
        onClick={handleLoading}
        style={{width:'100%',height:'auto'}}
      />      
      </div>
      <div style={{ flex:1,
                    display:'block',                          
                    backgroundColor:'#f1f1f1'}}>
        <Element Label="Name" value={item.name} />
        <Element Label="Color" value={item.color} />
        <Element Label="Size" value={item.size} />
        <Element Label="Sold" value={item.TotalSoldItems ? item.TotalSoldItems : '0'} />
        {item.discount > 0 ? <Price_strike item={item} /> : <Price item={item} />}
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
