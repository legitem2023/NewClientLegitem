'use client';

import { Icon } from '@iconify/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from 'Redux/cartSlice';
import DataManager from 'utils/DataManager';

type PropsAddCartCmdView = {
  viewedProduct: any;
  quantity: any;
  stock: any;
};

const AddCartCmdView: React.FC<PropsAddCartCmdView> = ({ viewedProduct, quantity, stock }) => {
  const Manager = new DataManager();
  const cart = viewedProduct?.map((item: any) => {
    return {
      id: item.id,
      productCode: item.productCode,
      image: item.thumbnail,
      name: item.name,
      color: item.color,
      size: item.size,
      price: parseInt(item.price),
      quantity: quantity
    };
  });

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (quantity > stock) {
      Manager.Warning('Stock not enough');
    } else {
      dispatch(addToCart(cart[0]));
      Manager.Success('Successfully added');
    }
  };

  return (
    <>
      <button onClick={handleAddToCart} className="add-to-cart">
        <span className="icon">
          <Icon icon="mdi:cart" />
        </span>
        <span className="text">Add to Cart</span>
      </button>

      <style jsx>{`
        .add-to-cart {
          position: relative;
          display: inline-flex;
          gap: 8px;
          width: 150px;
          padding: 0px;
          font-size: 18px;
          font-weight: bold;
          font-family: 'Segoe UI', sans-serif;
          color: #fff;
          background: linear-gradient(45deg, #5C3317, #703C1D);
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.2),
                      inset -2px -2px 5px rgba(0, 0, 0, 0.4),
                      0 4px 6px rgba(0, 0, 0, 0.2);
          text-shadow: 1px 1px 0 #000;
          transition: transform 0.2s ease;
          overflow: hidden;
        }

        .add-to-cart:active {
          transform: scale(0.98);
          box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.2),
                      inset -1px -1px 3px rgba(0, 0, 0, 0.4),
                      0 3px 4px rgba(0, 0, 0, 0.2);
        }

        .text {
          border-radius: 0px 8px 8px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
          height:45px;
        }

        .icon {
          color:#707070;
          height:45px;
          background: linear-gradient(-45deg, #ffffff, #f1f1f1); /* Reversed gradient */
          padding: 5px 10px;
          border-radius: 5px 0px 0px 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.2),
                      inset -2px -2px 5px rgba(0, 0, 0, 0.4),
                      0 4px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default AddCartCmdView;
