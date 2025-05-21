'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Autoplay} from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import Element_Title from '../UI/Element_Title';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
import CanvasTextImage from "../UI/CanvasTextImage";
const ReusableSlideNames = ({ data }) => {
  return (
    <div className="card" style={{ width:"100%",aspectRatio:"2 / 10",position: "relative", padding: "10px" }}>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        autoplay={{delay:2500,disableOnInteraction:false}}
        style={{ position: "relative", width: "100%",aspectRatio: "2 / 8" }}
        loop={false}
        modules={[Autoplay]}
      >
        {data.map((item: any, idx: number) => (
          <SwiperSlide key={idx} style={{ backgroundColor: "transparent", textAlign:'left' }}>
            <CanvasTextImage text={item.Name}/>
            <b style={{
              textAlign: 'left',
              marginTop: '10px',
              fontSize: '10px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
            </b>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReusableSlideNames
