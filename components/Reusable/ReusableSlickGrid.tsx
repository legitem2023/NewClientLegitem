'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const ReusableSlickGrid = ({ data }) => {
  return (
    <div className="card" style={{ width: "100%", position: "relative", padding: "10px" }}>
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        style={{ position: "relative", width: "100%" }}
        loop={false}
        pagination={{ dynamicBullets: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 100,
          modifier: 3.5,
          slideShadows: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
      >
        {data.map((item: any, idx: number) => (
          <SwiperSlide
            key={idx}
            style={{
              backgroundColor: "transparent",
              textAlign: 'left',
              width: '100%',
            }}
          >
            <div style={{
              width: '100%',
              aspectRatio: '16 / 9', // Change to '4 / 3' if needed
              overflow: 'hidden',
              borderRadius: '5px',
            }}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src={item.image}
                alt={item.Name}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlickGrid
