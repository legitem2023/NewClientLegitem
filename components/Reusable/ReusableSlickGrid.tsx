'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Grid } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import Element_Title from '../UI/Element_Title';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";

const ReusableSlickGrid = ({ data }) => {
  return (
    <div className="card" style={{ height: "auto", position: "relative", padding: "10px" }}>
      <Swiper
        slidesPerView={7}
        spaceBetween={10}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        style={{ position: "relative", width: "100%" }}
        loop={false}
        modules={[Autoplay]}
      >
        {data.map((item: any, idx: number) => (
          <SwiperSlide key={idx} style={{ backgroundColor: "transparent", textAlign: 'left' }}>
            <img
              style={{
                borderRadius: '5px',
                width: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
              }}
              src={item.image}
              alt={item.Name}
            />
            <b style={{
              textAlign: 'left',
              marginTop: '10px',
              fontSize: '10px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {item.Name}
            </b>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlickGrid
