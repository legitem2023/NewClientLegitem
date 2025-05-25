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
    <div className="searchContainer" style={{ width: '100%', backgroundColor: '#f1f1f1', overflow: 'hidden',padding:'5px' }}>
      <Swiper slidesPerView={2} spaceBetween={5} navigation={true} freeMode={true} modules={[FreeMode, Navigation]}
        style={{ padding: 0, width: '100%', height: '100%',boxSizing:'border-box' }}>
        {items.map((item, index) => (
          <SwiperSlide key={index} style={{boxSizing:'border-box'}}>
            <div style={{ width: '100%', height: '100%' }}>
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlider
