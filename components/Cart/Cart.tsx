'use client';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../../Redux/cartSlice";
import ReusableCartItem from './ReusableCartItem'; 
import ReusableCard from '../UI/ReusableCard';
import { formatter, imageSource } from 'utils/scripts'; //
import Image from 'next/image';
import CartEmpty from './CartEmpty';
import Link from 'next/link';

const Cart =() => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems || []);


  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const SubTotal = cartItems.reduce((sum: number, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);

  const TotalAmount = parseFloat(SubTotal) + (parseFloat(SubTotal) * .2) + 10;
  const handleError = () => {
    
  }
  const handleLoading = () => {
    
  }
  const view = (item) =>{
    console.log(item);
  }
  return (
      <div className="cartTable">
        <div className="cartTableData">
          {cartItems.length > 0 ? cartItems.map((item: any, idx: number) => (
              <ReusableCartItem
              id={item.id}
              key={idx}
              size={item.size}
              color={item.color}
              price={item.price}
              quantity={item.quantity}
              name={item.name}
              productCode={item.productCode}
              image={item.image}
              clearItem = {()=> handleClearCart()}
              removeItem={() => handleRemoveFromCart(item.id)}
            />
          )) : <CartEmpty/>}
          {cartItems.length > 0 ? <button onClick={()=>handleClearCart()}>Remove All</button>:""}
        </div>
        <div className="cartTableTotal">
          <div className="cartTableTotal_row1">
            <div className='cartTableSubtotal'>
              <div>Subtotal </div>
              <div>{formatter.format(SubTotal)}</div>
            </div>
            <div className='cartTableShipping'>
              <div>Shipping </div>
              <div>2%</div>
            </div>            
            <div className='cartTableTax'>
              <div>Tax </div>
              <div>10%</div>
            </div>
            <div className='cartTableTotal'>
              <div>Total Amount </div>
              <div>{formatter.format(TotalAmount)}</div>
            </div>
          </div>
          <div  className="cartTableTotal_row2">
            <Link href={`./Checkout/`} type="button" className="universalButtonStyle">Checkout</Link>
            <button type="button" className="universalButtonStyle">Continue Shopping</button>
          </div>
          <div className='cartTableTotal_row3'>
            <Image width="50" height="40" src='https://readymadeui.com/images/master.webp' alt="card1"/>
            <Image width="50" height="40" src='https://readymadeui.com/images/visa.webp' alt="card2" />
            <Image width="50" height="40" src='https://readymadeui.com/images/american-express.webp' alt="card3" />
          </div>
        </div>
      </div>
  );
};

export default Cart;
