import { Icon } from '@iconify/react'
import React from 'react'

const ReusableNotification = ({number}) => {
  return (
    <span className='ReusableNotification'>
        <span>
            <Icon icon="mdi:bell" width="44" height="44"/>
        </span>
        <span>
            {number}
        </span>
    </span>
  )
}

export default ReusableNotification