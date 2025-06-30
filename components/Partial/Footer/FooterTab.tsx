'use client'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Link from 'next/link'
import {useSelector} from 'react-redux';
import { setTabValue } from 'Redux/tabSlice';

const FooterTab:React.FC = () => {
 
  
  return (
    <div className='footer'>
      <div className='FootHeader'>
        <Icon icon="logos:tiktok-icon" />
        <Icon icon="entypo-social:facebook" style={{color:'#104291'}}/>
        <Icon icon="entypo-social:instagram" style={{color:'#d609ad'}}/>
        <Icon icon="entypo-social:youtube" style={{color:'#ff0000'}}/>
      </div>
      <div className='FootCenter'>
      <span className='foot_label' onClick={()=>{dispatch(setTabValue({ tab: 'TabA', value:'6'}));   }}>
        About Legitem
      </span>
      <span className='foot_label' onClick={()=>{dispatch(setTabValue({ tab: 'TabA', value:'6'}));   }}>
        FAQ
      </span>
      <span className='foot_label' onClick={()=>{dispatch(setTabValue({ tab: 'TabA', value:'6'}));   }}>
        Disclaimer
      </span>
      <span className='foot_label' onClick={()=>{dispatch(setTabValue({ tab: 'TabA', value:'6'}));   }}>
        Privacy
      </span>
      <span className='foot_label' onClick={()=>{dispatch(setTabValue({ tab: 'TabA', value:'6'}));   }}>
        Contact Us
      </span>
      </div>
      <div className='FootFooter'>
        All Right Reserved ©2024
      </div>
    </div>
  )
}

export default FooterTab
