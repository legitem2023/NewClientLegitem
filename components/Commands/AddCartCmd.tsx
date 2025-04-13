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
    const Manager = new DataManager();
    const dispatch = useDispatch(); 
    const AddToCart = (item) =>{
        console.log([item]);
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
            console.log(cartData);
            dispatch(addToCart(cartData));
            Manager.success("Added to cart");
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
