import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
// import 'swiper/css/scrollbar';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
const SliderModels = () => {
    
    return (
      <div style={{height:"auto",position:"relative"}}>
            <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            style={{position:"relative",width:"100%"}}
            modules={[Pagination]}
            loop={false}>
              <SwiperSlide>
                 <ModelViewer data="/Rolex.glb"/> 
              </SwiperSlide>
               {/* <SwiperSlide>
                 <ModelViewer data="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"/> 
              </SwiperSlide> */}
              {/*<SwiperSlide>
                 <ModelViewer data="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"/> 
              </SwiperSlide> */}
          </Swiper>
      </div>
  )
}

export default SliderModels
