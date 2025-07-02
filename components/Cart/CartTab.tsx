import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import Cart from 'components/Cart/Cart';
import Ads from 'components/Ads/Ads'
import React from 'react';
const CartTab:React.FC = () => {
  return (
    <ReusableFlexLayout 
      childA={()=>(<Ads/>)}
      childB={()=>(<Cart/>)} 
      childC={()=>(<Ads/>)}/>
  );
};

export default CartTab;
