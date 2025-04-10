'use client'
import React, { FC } from 'react'
import ReusableQuantityChanger from './ReusableQuantityChanger'
import { CartItemWithFunc } from '@/types'
import Image from 'next/image'
import Element from '../UI/Element';
import { formatter } from 'utils/scripts' 
import { Icon } from '@iconify/react'

const ReusableCartItem: FC<CartItemWithFunc> = ({ id, size, color, price, quantity, name, productCode, image, removeItem }) => {
    return (
        <div className="ReusableCardContainer">
            {/* Product Image & Remove Icon */}
            <div className="ReusableCardContainer_1">
                <Image src={image === "" || image === null ? `/image/Legitem.jpg` : image} height={150} width={150} alt={name} />
                <Icon icon="mdi:trash" width="24" height="24" style={{ color: "#cd0000", cursor: "pointer" }} onClick={removeItem} />
            </div>

            {/* Product Details */}
            <div>
                
                <Element Label="Name" value={name}/>
                <Element Label="Size" value={size}/>
                <Element Label="Color" value={color}/>
                <Element Label="Price" value={formatter.format(price)}/>
                <ReusableQuantityChanger id={id} qty={quantity} />
                <Element Label="Sub Total" value={formatter.format(price * quantity)}/>         
           </div>
    </div>
    )
}

export default ReusableCartItem
