import { Icon } from '@iconify/react'
import React from 'react'

const ReusableNotification = ({number}) => {
  return (
    <span className='ReusableNotification'>
        <span>
            <Icon icon="mdi:bell" width="30" height="30"/>
        </span>
        <span>
            {number}
        </span>
    </span>
  )
}

export default ReusableNotification
