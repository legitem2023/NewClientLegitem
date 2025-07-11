import Image from 'next/image';
import { ReactNode } from 'react';
import Element from '../UI/Element';
import Element_Title from '../UI/Element_Title';
import Ratings from '../Partial/Ratings/Ratings';
import Price from '../UI/Price';
import Price_strike from '../UI/Price_strike';
interface ReusableCardProps {
  item: any;
  view: (item: any) => void;
  imageSource: (item: any) => string;
  handleError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleLoading: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  childA: () => ReactNode;
}

const ReusableLikeCard: React.FC<ReusableCardProps> = ({ item, view, imageSource, handleError, handleLoading,childA }) => {
  return (
    <div key={item.id} className='ReusableCardContainer' style={{padding:'5px'}} onClick={() => view(item)}>
      <div className='ReusableCardContainer_1'>
        <Image
        src={imageSource(item)}
        style={{filter:item.stock < 1?'grayscale(100%)':'',aspectRatio:'1/1'}}
        height={150}
        width={150}
        quality={1}
        alt={`Image_`+item.id}
        priority
        onError={handleError}
        onClick={handleLoading}/>      
      </div>
      <div className='ReusableCardContainer_1'>
        <Element_Title Label="Name" value={item.name} />
        <Element Label="Color" value={item.color} />
        <Element Label="Size" value={item.size} />
        <Element Label="Sold" value={item.TotalSoldItems ? item.TotalSoldItems : '0'} />
        {item.discount > 0 ? <Price_strike item={item} /> : <Price item={item} />}
        <div className='Rates' style={{display:'flex',
                                       flexDirection:'row',
                                       justifyContent:'center',
                                       alignItems:'center',
                                       gap:'2px',
                                       backgroundColor:'#c0c0c0',
                                       width:'100%'}}>
          <div className='ViewsLikes' style={{flexGrow:'3',
                                       display:'flex',
                                       flexDirection:'row',
                                       justifyContent:'center',
                                       alignItems:'center'}}>
            <Ratings data={item.TotalRatings > 0 ? item.TotalRatings : 0} count={item} />
          </div>
          <div>
           {childA()}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ReusableLikeCard;
