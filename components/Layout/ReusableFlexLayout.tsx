import { ReusableMainLayoutProps } from '@/types';
import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux';


const ReusableFlexLayout:FC<ReusableMainLayoutProps> = ({childA,childB,childC}) => {
    const drawerState = useSelector((state:any)=> state.drawer.drawer)
    return (
    <div className='FlexContainer'>
      <div className="LeftContainer">
        {childA()}
      </div>
      <div className='CentralContainer'>
        {childB()}
      </div>
      <div className='RightContainer'>
        {childC()}
      </div>
    </div>
  )
}

export default ReusableFlexLayout
