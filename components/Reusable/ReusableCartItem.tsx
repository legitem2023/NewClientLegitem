'use client'
import React, { FC } from 'react'
import ReusableQuantityChanger from './ReusableQuantityChanger'
import { CartItemWithFunc } from '@/types'
import Image from 'next/image'
import Element from '../UI/Element'
import Element_Title from '../UI/Element_Title'
import { formatter } from 'utils/scripts' 
import { Icon } from '@iconify/react'

const ReusableCartItem: FC<CartItemWithFunc> = ({ id, size, color, price, quantity, name, productCode, image, removeItem }) => {
    return (
        <div className="ReusableCardContainer" style={{ position: 'relative' }}>
            {/* Product Image & Remove Icon */}
            <div className="ReusableCardContainer_1">
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                    <Image 
                        src={image === "" || image === null ? `/image/Legitem.jpg` : image} 
                        alt={name} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                    />
                    <Icon 
                        icon="material-symbols:close" 
                        width="24" 
                        height="24" 
                        style={{ 
                            color: "#cd0000", 
                            cursor: "pointer", 
                            position: 'absolute', 
                            top: '8px', 
                            right: '8px', 
                            backgroundColor: '#fff', 
                            borderRadius: '50%' 
                        }} 
                        onClick={removeItem} 
                    />
                </div>
            </div>

            {/* Product Details */}
            <div>
                <Element_Title Label="Name" value={name} />
                <Element Label="Size" value={size} />
                <Element Label="Color" value={color} />
                <Element Label="Price" value={formatter.format(price)} />
                <ReusableQuantityChanger id={id} qty={quantity} />
                <Element Label="Sub Total" value={formatter.format(price * quantity)} />         
            </div>
        </div>
    )
}

export default ReusableCartItem
