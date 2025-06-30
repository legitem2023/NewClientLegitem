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
                outline: "none", // focus:outline-none
                transition: "background-color 0.2s ease-in-out",
                whiteSpace:'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' }}>{label}</div>

  )
}

export default ReusableText
