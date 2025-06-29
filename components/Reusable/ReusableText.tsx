import { Icon } from '@iconify/react'
import React, { FC } from 'react'

type ReusableTextProps = {
    label:string,
}
const ReusableText:FC<ReusableTextProps> = ({label}) => {
  return (
      <div
        
        style={{padding: 0,
                border:'none',
                fontSize:'14px',
                borderRadius: "9999px", // rounded-full
                backgroundColor: "#F3F4F6", // bg-gray-100
                outline: "none", // focus:outline-none
                transition: "background-color 0.2s ease-in-out",
                whiteSpace:'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' }}>{label}</div>

  )
}

export default ReusableText
