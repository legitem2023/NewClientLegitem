import { Icon } from '@iconify/react'
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from 'Redux/cartSlice';
import DataManager from 'utils/DataManager';
import { Cart } from 'utils/scripts';

type PropsAddCartCmd = {
    item: any
}
const AddCartCmd:React.FC<PropsAddCartCmd> = (item) => {
      const AddToCart = (item) =>{
        const cartData:any = [item].map((item:any)=>{
          return {
            id: item.id, // You can change this to number if IDs are numeric
            productCode:item.productCode,
            image:item.image,
            name: item.name,
            color:item.color,
            size:item.size,
            price: parseInt(item.price),
            quantity: 1
          }
        })
     } 
    
  return (
    <Icon 
    icon='mdi:cart' 
    className='iconify_cart' 
    onClick={() => AddToCart(item)}
  />
  )
}

export default AddCartCmd