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
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={2.5}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        style={{ width: "100%" }}
        loop={false}
        pagination={{ dynamicBullets: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 150,
          modifier: 3.5,
          slideShadows: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
      >
        {data.map((item: any, idx: number) => (
          <SwiperSlide
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0px',
            }}
          >
            <div style={{
              width: '100%',
              aspectRatio: '16 / 9', // or '4 / 3'
              overflow: 'hidden',
              borderRadius: '8px',
              backgroundColor: '#f0f0f0',
            }}>
              <img
                src={item.image}
                alt={item.Name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlickGrid
