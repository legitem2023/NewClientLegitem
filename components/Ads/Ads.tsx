'use client'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
import AdDropdown from './AdDropdown';
const Ads:React.FC = () => {
//const storeproductType = useSelector((state: any) => state.productTypeData.productTypeData);
  const Ads = [{ Name:'Spotted!'},
               { Name:'The perfect place for your product.' },
               { Name:'Call now: 09153392813'}]
  
  const Dropdown = (<ReusableSlideNames data={Ads}/>)
  
  return (
     <AdDropdown content={Dropdown}/>
  )
}

export default Ads
