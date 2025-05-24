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
    <div className="searchContaier" style={{width:'100%',backgroundColor:'red'}}>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        freeMode={true}
        modules={[FreeMode]}
        style={{ padding: 0,width:'100%',boxShadow:'0.5px 0.5px 3px #000000' }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div style={{ width:'100%', height:'100%'}}>
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlider
