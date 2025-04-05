import React from 'react'
import { formatter } from 'utils/scripts'

type PropsPrice = {
    item:any,
    orig:any
}
const Price_strike:React.FC<PropsPrice> = ({item,orig}) => {
  return (
  <div>  
      <s className='thumbElements'>{formatter.format(item.price)}</s>
      <span className='thumbElements'>{formatter.format(orig)}</span>
  </div>
  )
}

export default Price_strike
