'use client'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
const Ads:React.FC = () => {
//const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
  const Ads = [{
    Name:'Showcase your business in this space! Message: 09153392813'}]
  return (
     <ReusableSlideNames data={Ads}/>
  )
}

export default Ads
