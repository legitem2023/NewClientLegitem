import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/scrollbar';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
const SliderModels = () => {
    
    return (
            <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            loop={false}>
              <SwiperSlide className="border-2 border-gray-300">
                 <ModelViewer data="https://new-client-legitem.vercel.app/modern_luxury_villa_house_building_home.glb"/> 
              </SwiperSlide>
              <SwiperSlide className="border-2 border-gray-300" >
                 <ModelViewer data="https://new-client-legitem.vercel.app/modern_luxury_villa_house_building_home.glb"/> 
              </SwiperSlide>
              <SwiperSlide  className="border-2 border-gray-300" >
                 <ModelViewer data="https://new-client-legitem.vercel.app/modern_luxury_villa_house_building_home.glb"/> 
              </SwiperSlide>
          </Swiper>
  )
}

export default SliderModels
