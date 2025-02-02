'use client'
import React from 'react'
import Menu from '../Partial/Menu'
import Products from './Products'
import ReusableMainLayout from 'components/Layout/ReusableMainLayout'
const ProductsBody = () => {
  return (
    <ReusableMainLayout childA={()=>(<Menu/>)} 
                  childB={()=>(<Products/>)}
                  childC={()=><></>}/>
  )
}

export default ProductsBody