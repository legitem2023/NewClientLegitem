'use client'
import React, { FC } from 'react'
import ReusableQuantityChanger from './ReusableQuantityChanger'
import { CartItemWithFunc } from '@/types'
import Image from 'next/image'
import { formatter } from 'utils/scripts' 
import { Icon } from '@iconify/react'

const ReusableCartItem: FC<CartItemWithFunc> = ({ id, size, color, price, quantity, name, productCode, image, removeItem }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "5px",
            borderBottom: "1px solid #ddd",
            width: "100%"
        }}>
            {/* Product Image & Remove Icon */}
            <div style={{
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                justifyContent: "space-between"
            }}>
                <Image src={image === "" || image === null ? `/image/Legitem.jpg` : image} height={200} width={200} alt={name} style={{ borderRadius: "8px",width:"200px",height:"auto" }} />
                <Icon icon="mdi:trash" width="24" height="24" style={{ color: "#cd0000", cursor: "pointer" }} onClick={removeItem} />
            </div>

            {/* Product Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold" }}>{name}</h3>
                <div style={{ fontSize: "12px", color: "#555" }}>Product Code: {productCode}</div>
                <div style={{ fontSize: "12px", color: "#555" }}>Size: {size}</div>
                <div style={{ fontSize: "12px", color: "#555" }}>Color: {color}</div>
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>Price: {formatter.format(price)}</div>
            </div>

            {/* Quantity Changer & Total Price */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px"
            }}>
                <ReusableQuantityChanger id={id} qty={quantity} />
                
            </div>
<div><h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>{formatter.format(price * quantity)}</h3></div>
        </div>
    )
}

export default ReusableCartItem
