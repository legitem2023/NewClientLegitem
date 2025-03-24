import { Icon } from '@iconify/react'
import React from 'react'

const ReusableNotification = ({ number }) => {
  return (
    <div className='ReusableNotification'>
      {/* Bell Icon with SVG Border */}
      <svg width="31" height="31" viewBox="0 0 50 50">
        <path
          d="M25 5C15 5 5 15 5 25C5 35 0 40 0 45H50C50 40 45 35 45 25C45 15 35 5 25 5Z"
          stroke="black"
          fill="none"
          strokeWidth="2"
        />
        <foreignObject x="10" y="10" width="30" height="30">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Icon icon="mdi:bell" width="30" height="30" />
          </div>
        </foreignObject>
      </svg>

      {/* Notification Count */}
      <div className="countnumber">
        {number}
      </div>
    </div>
  )
}

export default ReusableNotification