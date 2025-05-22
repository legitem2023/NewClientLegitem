'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Grid } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Element_Title from '../UI/Element_Title';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";

const ReusableSlickGrid = ({ data }) => {
  return (
    <div className="card" style={{ width: "100%",aspectRatio:'3 / 1', position: "relative", padding: "10px" }}>
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={2.5}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        style={{ position: "relative", width: "100%" }}
        loop={false}
        pagination={{
          dynamicBullets:true
        }}
        coverflowEffect={{
          rotate:0,
          stretch:10,
          depth:100,
          modifier:2.5,
          slideShadows:true
        }}
      
        modules={[Autoplay,EffectCoverflow,Pagination]}
      >
        {data.map((item: any, idx: number) => (
          <SwiperSlide key={idx} style={{ backgroundColor: "transparent", textAlign: 'left',width:'100%',aspectRatio:'3 / 4' }}>
            <img
              style={{
                borderRadius: '5px',
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
              }}
              src={item.image}
              alt={item.Name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlickGrid
