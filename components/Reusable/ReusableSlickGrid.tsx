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
    <div className="card" style={{ width: "100%",aspectRatio:'16 / 9', position: "relative", padding: "10px" }}>
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={'auto'}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        style={{ position: "relative", width: "100%" }}
        loop={false}
        pagination={{
          dynamicBullets:true
        }}
        coverflowEffect={{
          rotate:0,
          stretch:50,
          depth:300,
          modifier:1,
          slideShadows:true
        }}
        breakpoints={{
       560: {
         slidesPerView: 2.5,
       },
      768: {
         slidesPerView: 3,
      },
      1024:{
        slidesPerView: 3
      }
  }}
        modules={[Autoplay,EffectCoverflow,Pagination]}
      >
        {data.map((item: any, idx: number) => (
          <SwiperSlide key={idx} style={{ backgroundColor: "transparent", textAlign: 'left' }}>
            <img
              style={{
                borderRadius: '5px',
                width: '100%',
                aspectRatio: '4 / 3',
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
