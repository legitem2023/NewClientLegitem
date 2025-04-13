'use client'
import React,{useState,useEffect, useContext, useRef, use} from 'react'
import ReusableBody from 'components/Reusable/ReusableBody'
import Cart from './Cart'

const CartBody = () => {

return(
    <ReusableBody childA={()=>""} childB={()=>(<Cart/>)} childC={()=>""}/>
  )
}

export default CartBody