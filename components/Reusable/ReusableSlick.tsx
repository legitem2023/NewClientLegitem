'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import Element_Title from '../UI/Element_Title';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";

const ReusableSlick = ({ data }) => {
  return (
    <div className="card" style={{ height: "auto", position: "relative", padding: "10px" }}>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        style={{ position: "relative", width: "100%" }}
        loop={false}
      >
        {data.map((item: any, idx: number) => (
          <SwiperSlide key={idx} style={{ backgroundColor: "transparent" }}>
            <img
              style={{ borderRadius: '10px', margin: '10px',width:'80px',height:'80px' }}
              height={200}
              width={200}
              src={item.image}
              alt={item.Name}
            />
            <b style={{textAlign:'left',marginTop:'10px',fontSize:'13px'}}>{item.Name}</b>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlick
