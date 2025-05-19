'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import Element_Title from '../UI/Element_Title';
// import 'swiper/css/scrollbar';
import ModelViewer from "../Partial/ThreeJS/ModelViewer";
const ReusableSlick = ({data}) => {    
    return (
      <div className="card" style={{height:"auto",position:"relative",padding:"10px"}}>
            <Swiper
            slidesPerView={3}
            spaceBetween={2}
            style={{position:"relative",width:"100%"}}
            loop={false}>
                  {data.map((item:any,idx:number)=>(
                <SwiperSlide key={idx} style={backgroundColor:"transparent"}>
                    <img style={{borderRadius:'10px',margin:'10px'}} height={200} width={200} src={item.image} />
                    <Element_Title Label={''} value={item.name}/>
                </SwiperSlide>   
                  ))}
          </Swiper>
      </div>
  )
}

export default ReusableSlick
