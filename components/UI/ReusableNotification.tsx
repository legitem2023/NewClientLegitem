import { Icon } from '@iconify/react'
import React from 'react'

const ReusableNotification = ({number}) => {
  return (
    <div className='ReusableNotification'>
        <div>
            <Icon icon="mdi:bell" width="30" height="30"/>
        </dov>
        <div>
            {number}
        </div>
    </div>
  )
}

export default ReusableNotification
