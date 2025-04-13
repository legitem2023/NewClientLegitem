import { Icon } from '@iconify/react'
import React, { FC } from 'react'

type ReusableLabelProps = {
    label:string,
    icn:string
}
const ReusableLabel:FC<ReusableLabelProps> = ({label,icn}) => {
  return (
      <div className='LabelHead carouselLabel'><Icon icon={icn} />{label}</div>
  )
}

export default ReusableLabel