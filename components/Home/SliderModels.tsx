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
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            loop={false}>
              <SwiperSlide className="border-2 border-gray-300" onClick={()=>view(item)}>
                 <ModelViewer data="/modern_luxury_villa_house_building_home.glb"/> 
              </SwiperSlide>
              <SwiperSlide className="border-2 border-gray-300" onClick={()=>view(item)}>
                 <ModelViewer data="/modern_luxury_villa_house_building_home.glb"/> 
              </SwiperSlide>
              <SwiperSlide  className="border-2 border-gray-300" onClick={()=>view(item)}>
                 <ModelViewer data="/modern_luxury_villa_house_building_home.glb"/> 
              </SwiperSlide>
          </Swiper>
  )
}

export default SliderModels
