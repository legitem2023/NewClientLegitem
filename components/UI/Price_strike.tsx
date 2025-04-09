import React from 'react'
import { formatter } from 'utils/scripts'

type PropsPrice = {
    item:any
}
const Price_strike:React.FC<PropsPrice> = ({item}) => {
  return (
  <div style={{display:'flex',flexDirection:'row'}}>  
      <s className='thumbElements' style={{color:"#c0c0c0"}}>{formatter.format(item.price)}</s>
      <span className='thumbElements'>{formatter.format(item.price * item.discount)}</span>
  </div>
  )
}

export default Price_strike
