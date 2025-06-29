'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

interface ReusableSliderProps {
  items: React.ReactNode[]
}

const ReusableSlider: React.FC<ReusableSliderProps> = ({ items }) => {
  return (
    <div className="searchContainer" style={{ width: '100%', backgroundColor: '#f1f1f1',padding:'5px' }}>
      <div style={{ padding: 0, width: '100%', height: '100%',boxSizing:'border-box', display:'flex',flexDirection:'row', gap:'2px'}}>
        {items.map((item, index) => (
          <div key={index} style={{boxSizing:'border-box'}}>
            <div style={{ width: '100%', height: '100%' }}>
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReusableSlider
