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
    <div className="searchContainer" style={{ width: '100%', backgroundColor: '#f1f1f1', overflow: 'hidden' }}>
      <Swiper
        slidesPerView={2}
        spaceBetween={5}
        navigation={true}
        freeMode={false}
        modules={[FreeMode, Navigation]}
        style={{ padding: 0, width: '100%', height: '100%', boxShadow: '0.5px 0.5px 3px #000000', backgroundColor: 'purple' }}
        
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} style={{ backgroundColor: 'red' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: 'green' }}>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlider
