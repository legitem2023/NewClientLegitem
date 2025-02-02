'use client'
import React, { FC } from 'react'
import ReusableQuantityChanger from './ReusableQuantityChanger'
import { CartItemWithFunc } from '@/types'
import Image from 'next/image'
import { formatter } from 'utils/scripts' 
import { Icon } from '@iconify/react'

const ReusableCartItem:FC<CartItemWithFunc> = ({id,size,color,price,quantity,name,productCode,image,clearItem,removeItem}) => {
    return (
    <div className="cartItemContainer">
        <div className="cartItems">
            <div className="cartItemsFdiv">
                <Image src={image==="" || image ===null?`/image/Legitem.jpg`:image} height="100" width="100" alt="1"/>
                <div>
                    <Icon icon="mdi:trash" width="24" height="24"  style={{"color": "#cd0000"}} onClick={removeItem}/>
                </div>
            </div>

            <div className="cartItemsSdiv">
                <div>
                    <h3 className="">{name}</h3>
                    <div className="">Product Code: {productCode}</div>
                    <div className="">Size: {size}</div>
                    <div className="">Color: {color}</div>
                    <div className="">Price: {formatter.format(price)}</div>
                </div>

                <div className="mt-auto flex items-center gap-3">
                    <ReusableQuantityChanger id={id} qty={quantity}/>
                </div>
            </div>
            <div className="cartItemsTdiv">
            <h3 className="text-base font-bold text-gray-800 mt-auto">{formatter.format(price * quantity)}</h3>
        </div>
        </div>


    </div>
  )
}

export default ReusableCartItem