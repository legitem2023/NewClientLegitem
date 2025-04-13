import { Icon } from '@iconify/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from 'Redux/cartSlice'
import DataManager from 'utils/DataManager'
type CartItem = {
    id: string, // You can change this to number if IDs are numeric
    productCode: string,
    thumbnail:string,
    name: string,
    color:string,
    size:string,
    price: string,
    quantity: string
}
type PropsAddCartCmd = {
  item: CartItem
}

const AddCartCmd: React.FC<PropsAddCartCmd> = ({ item }) => {
  const Manager = new DataManager()
  const dispatch = useDispatch()
console.log(item)
  const AddToCart = () => {
    
    const cartData = {
      id: item.id,
      productCode: item.productCode,
      image: item.thumbnail,
      name: item.name,
      color: item.color,
      size: item.size,
      price: parseInt(item.price),
      quantity: 1,
    }
    
    if(item.stock < 1){
        Manager.Warning("Stock not enough");
    }else{
        dispatch(addToCart(cartData));
        Manager.Success("Successfully added")
    } 
  }
  return (
    <>
        <Icon
          icon='mdi:cart'
          className='iconify_cart'
          onClick={AddToCart}
      />
    </>
  )
}

export default AddCartCmd
