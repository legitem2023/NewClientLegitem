import { Icon } from '@iconify/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from 'Redux/cartSlice'
import DataManager from 'utils/DataManager'
type CartItem = {
    id: string, // You can change this to number if IDs are numeric
    productCode: string,
    image:string,
    name: string,
    color:string,
    size:string,
    price: number,
    quantity: number
}
type PropsAddCartCmd = {
  item: CartItem
}

const AddCartCmd: React.FC<PropsAddCartCmd> = ({ item }) => {
  const Manager = new DataManager()
  const dispatch = useDispatch()

  const AddToCart = () => {
    console.log(item)
    const cartData: any = {
      id: item.id,
      productCode: item.productCode,
      image: item.image,
      name: item.name,
      color: item.color,
      size: item.size,
      price: parseInt(item.price),
      quantity: 1,
    }

    console.log(cartData)
    dispatch(addToCart([cartData]))
    Manager.Success('Added to cart')
  }

  return (
    <Icon
      icon='mdi:cart'
      className='iconify_cart'
      onClick={AddToCart}
    />
  )
}

export default AddCartCmd
