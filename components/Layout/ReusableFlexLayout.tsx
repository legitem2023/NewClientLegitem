import { ReusableMainLayoutProps } from '@/types';
import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux';


const ReusableFlexLayout:FC<ReusableMainLayoutProps> = ({childA,childB,childC}) => {
    const drawerState = useSelector((state:any)=> state.drawer.drawer)
    return (
    <div className='FlexContainer'>
      <div className="LeftContainer">
        <span style={{fontSize:'12px',padding:'5px'}}>Advertisement</span>
        {childA()}
      </div>
      <div className='CentralContainer' style={{ position:'relative' }}>
        {childB()}
      </div>
      <div className='RightContainer'>
        <span style={{fontSize:'12px',padding:'5px'}}>Advertisement</span>
        {childC()}
      </div>
    </div>
  )
}

export default ReusableFlexLayout
