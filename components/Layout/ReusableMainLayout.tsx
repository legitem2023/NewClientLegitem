import { ReusableMainLayoutProps } from '@/types';
import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux';


const ReusableMainLayout:FC<ReusableMainLayoutProps> = ({childA,childB,childC}) => {
    const drawerState = useSelector((state:any)=> state.drawer.drawer)
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

export default ReusableMainLayout