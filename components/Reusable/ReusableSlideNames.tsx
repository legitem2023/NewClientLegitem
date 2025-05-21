'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // <-- import navigation CSS
import Element_Title from '../UI/Element_Title';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
import CanvasTextImage from "../UI/CanvasTextImage";

const ReusableSlideNames = ({ data }) => {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      aspectRatio: '16 / 4.5',
      boxSizing: "border-box"
    }}>
      <div style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        aspectRatio: '16 / 4.5',
        boxSizing: "border-box"
      }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation // <-- enable navigation
          loop={false}
          modules={[Autoplay, Navigation]} // <-- include Navigation module
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
            boxSizing: "border-box"
          }}
        >
          {data.map((item: any, idx: number) => (
            <SwiperSlide
              key={idx}
              style={{
                textAlign: 'left',
                width: "100%",
                height: "100%"
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
