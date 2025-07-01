import Image from 'next/image'
import Element from '../UI/Element'
import Element_Title from '../UI/Element_Title'
import Ratings from '../Partial/Ratings/Ratings'
import Price from '../UI/Price'
import Price_strike from '../UI/Price_strike'

interface ReusableCardProps {
  item: any
  view: (item: any) => void
  imageSource: (item: any) => string
  handleError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
  handleLoading: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

const ReusableCard: React.FC<ReusableCardProps> = ({
  item,
  view,
  imageSource,
  handleError,
  handleLoading,
}) => {
  return (
    <div key={item.id} className='ReusableCardContainer' onClick={() => view(item)}>
      <div className='ReusableCardContainer_1'>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
          <Image
            src={imageSource(item)}
            alt={`Image_${item.id}`}
            fill
            quality={1}
            priority
            onError={handleError}
            onLoadingComplete={handleLoading}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className='ReusableCardContainer_1'>
        <Element_Title Label='Name' value={item.name} />
        <Element Label='Color' value={item.color} />
        <Element Label='Size' value={item.size} />
        <Element Label='Sold' value={item.TotalSoldItems ? item.TotalSoldItems : '0'} />
        {item.discount > 0 ? <Price_strike item={item} /> : <Price item={item} />}
        <div className='Rates'>
          <div className='ViewsLikes'>
            <Ratings data={item.TotalRatings > 0 ? item.TotalRatings : 0} count={item} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReusableCard
