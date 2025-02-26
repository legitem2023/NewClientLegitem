import { Icon } from '@iconify/react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from 'Redux/cartSlice';
import DataManager from 'utils/DataManager';

type PropsAddCartCmdView = {
    viewedProduct:any
    quantity:any
    stock:any
}
const AddCartCmdView:React.FC<PropsAddCartCmdView> = ({viewedProduct,quantity,stock}) => {
   
    const Manager = new DataManager();
    console.log(viewedProduct);
    const cart = viewedProduct?.map((item:any)=>{
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
    const dispatch = useDispatch();
    const handleAddToCart = () =>{
        if(quantity > stock){
            Manager.Warning("Stock not enough");
        }else{
            dispatch(addToCart(cart[0]));
            Manager.Success("Successfully added")
        }
        
    }
    return (
    <button onClick={handleAddToCart} className='addCart universalButtonStyle'>
        <Icon icon="mdi:cart" /> Add to Cart
    </button>
  )
}

export default AddCartCmdView
