import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux';
// import { useGlobalState } from 'state';

type ReusableBodyProps = {
    childA:()=>ReactNode;
    childB:()=>ReactNode;
    childC:()=>ReactNode;
}

const ReusableBody:FC<ReusableBodyProps> = ({childA,childB,childC}) => {
  const drawerState = useSelector((state:any)=> state.drawer.drawer);//'';//useGlobalState("drawer");
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        {childA()}
      </div>
      <div className='middlecontainer'>
        {childB()}
      </div>
      <div className='RightWing'>
        {childC()}
      </div>
    </div>
  )
}

export default ReusableBody