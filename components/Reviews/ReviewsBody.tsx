import React from 'react'
import Reviews from './Reviews'
import Menu from '../Partial/Menu'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'

const ReviewsBody = () => {
  return (
    <ReusableMainLayout childA={()=>(<></>)} 
                  childB={()=>(<Reviews/>)}
                  childC={()=><></>}/>
  )
}

export default ReviewsBody