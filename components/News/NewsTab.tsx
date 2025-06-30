import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import News from 'components/News/News';
import Ads from 'components/Ads/Ads'
import React from 'react';
const NewsTab:React.FC = () => {
  return (
    <ReusableFlexLayout 
      childA={()=>(<Ads/>)}
      childB={()=>(<News/>)} 
      childC={()=>(<Ads/>)}/>
  );
};

export default NewsTab;
