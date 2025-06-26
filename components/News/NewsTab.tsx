import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import News from 'components/News/News';
import React from 'react';
const NewsTab:React.FC = () => {
  return (
    <ReusableFlexLayout 
      childA={()=>(<></>)}
      childB={()=>(<News/>)} 
      childC={()=>(<></>)}/>
  );
};

export default NewsTab;
