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
        console.log(item.item);
        const cartData:any = {
            id: item.item.id, // You can change this to number if IDs are numeric
            productCode:item.item.productCode,
            image:item.item.image,
            name: item.item.name,
            color:item.item.color,
            size:item.item.size,
            price: parseInt(item.item.price),
            quantity: 1
          }
            console.log(cartData);
            dispatch(addToCart([cartData]));
            Manager.Success("Added to cart");
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
