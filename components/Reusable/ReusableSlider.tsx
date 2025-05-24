'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'

interface ReusableSliderProps {
  items: React.ReactNode[]
}

const ReusableSlider: React.FC<ReusableSliderProps> = ({ items }) => {
  return (
    <div className="searchContaier" style={{width:'100%'}}>
      <Swiper
        slidesPerView={3}
        freeMode={true}
        modules={[FreeMode]}
        spaceBetween={0}
        style={{ padding: 0 }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full" style={{ aspectRatio: '8 / 1' }}>
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlider
