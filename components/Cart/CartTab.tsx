import ReusableFlexLayout from 'components/Layout/ReusableFlexLayout'
import CartBody from 'components/Cart/CartBody';
import Ads from 'components/Ads/Ads'
import React from 'react';
const CartTab:React.FC = () => {
  return (
    <ReusableFlexLayout 
      childA={()=>(<Ads/>)}
      childB={()=>(<CartBody/>)} 
      childC={()=>(<Ads/>)}/>
  );
};

export default CartTab;
