'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
// import 'swiper/css/scrollbar';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
const ReusableSlick = () => {
    
    return (
      <div style={{height:"auto",position:"relative",padding:"10px"}}>
            <Swiper
            slidesPerView={3}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            style={{position:"relative",width:"100%"}}
            modules={[Pagination]}
            loop={false}>
              <SwiperSlide>
                           <img style={{borderRadius:'10px'}} height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
                <SwiperSlide>
                           <img style={{borderRadius:'10px'}} height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
              <SwiperSlide>
                           <img style={{borderRadius:'10px'}} height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
              <SwiperSlide>
                           <img  style={{borderRadius:'10px'}}  height={200} width={200} src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
              </SwiperSlide>
          </Swiper>
      </div>
  )
}

export default ReusableSlick
