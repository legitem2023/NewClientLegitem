'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import Element_Title from '../UI/Element_Title';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
import CanvasTextImage from "../UI/CanvasTextImage";

const ReusableSlideNames = ({ data }) => {
  return (
    <div style={{ position: 'relative', width: '100%',aspectRatio:'6 / 2'}}>
      <div style={{ position: 'absolute', width: '100%',aspectRatio:'6 / 2' }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          style={{ position: "relative", width: "100%", height: "100%" }}
          loop={false}
          modules={[Autoplay]}
        >
          {data.map((item: any, idx: number) => (
            <SwiperSlide
              key={idx}
              style={{
                backgroundColor: "red",
                textAlign: 'left',
                width: "100%",
                aspectRatio:'6 / 2'
              }}
            >
              <CanvasTextImage text={item.Name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReusableSlideNames
