'use client'
import ReusableSlideNames from 'components/Reusable/ReusableSlideNames';
import AdDropdown from './AdDropdown';
const Ads:React.FC = () => {

  const Dropdown = (<marquee style={{transition:'ease 0.5s',height:'80px'}}>Spotted! The perfect place for your products call now 09153392813</marquee>)
  return (
     <AdDropdown content={Dropdown}/>
  )
}

export default Ads
