'use client'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
import marquee from 'components/UI/Marquee';
import AdDropdown from './AdDropdown';
const Ads:React.FC = () => {

  const Dropdown = (<marquee >Spotted! The perfect place for your products call now 09153392813</marquee>)
  return (
     <AdDropdown content={Dropdown}/>
  )
}

export default Ads
