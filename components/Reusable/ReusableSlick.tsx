/*
import React, { Component } from "react";
import Slider from "react-slick";
import "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css";
import "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css";
//import { baseUrl } from "./config";
function ReusableSlick() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';

  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
      </Slider>
    </div>
  );
}

export default ReusableSlick;

*/
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
// import 'swiper/css/scrollbar';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
const ReusableSlick = () => {
    
    return (
      <div style={{height:"auto",position:"relative"}}>
            <Swiper
            slidesPerView={4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            style={{position:"relative",width:"100%"}}
            modules={[Pagination]}
            loop={false}>
              <SwiperSlide>
                           <img height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
                <SwiperSlide>
                           <img height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
              <SwiperSlide>
                           <img height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
              <SwiperSlide>
                           <img height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
          </Swiper>
      </div>
  )
}

export default ReusableSlick
