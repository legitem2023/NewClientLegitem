import { Icon } from '@iconify/react'
import React from 'react'

const ReusableNotification = ({number}) => {
  return (
    <div className='ReusableNotification' style={{transform:number>0?scale(parseInt(1):scale(0))}}>
      <div className="icon-container">
        <Icon icon="mdi:bell" width="20" height="20" className="icon-with-border"/>
      </div>
      <div className="countnumber">
        {number}
      </div>
    </div>
  )
}

export default ReusableNotification
