'use client'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
const Ads:React.FC = () => {
//const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
  const Ads = [{ Name:'Spotted!'},
               { Name:'The perfect place for your product.' },
               { Name:'Call now: 09153392813'}]
  return (
     <ReusableSlideNames data={Ads}/>
  )
}

export default Ads
