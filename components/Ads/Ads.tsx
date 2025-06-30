'use client'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
import Marquee from 'components/UI/Marquee';
import AdDropdown from './AdDropdown';
const Ads:React.FC = () => {

  const Dropdown = (<Marquee text="Spotted! The perfect place for your products call now 09153392813" fontSize="45px" speed={5} />)
  return (
     <AdDropdown content={Dropdown}/>
  )
}

export default Ads
