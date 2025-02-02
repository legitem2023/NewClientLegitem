import { ReusableCenterLayoutProps } from '@/types'
import React, { FC, ReactNode } from 'react'


const ReusableCenterLayout:FC<ReusableCenterLayoutProps> = ({child1,child2,child3,child4}) => {
  return (
    <div className='centralLayout'>
        <div>{child1()}</div>
        <div>{child2()}</div>
        <div>{child3()}</div>
        <div>{child4()}</div>
    </div>
  )
}

export default ReusableCenterLayout