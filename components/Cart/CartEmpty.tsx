import React from 'react'
const CartEmpty = () => {
  return (
    <div className='game-icons--shopping-cart'>
    <div>
      <p style={{fontWeight:'bold',fontSize:'30px'}}>Your cart is Empty</p>
      <p>Looks like you have not added anything to your cart Go ahead and explore the shop</p>
      <button className='universalButtonStyle'>Explore</button>
    </div>
  </div>
  )
}

export default CartEmpty
