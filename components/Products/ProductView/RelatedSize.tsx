import React from 'react'
import { GET_CHILD_INVENTORY_RELATED_COLOR_SIZE } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { i } from 'vitest/dist/reporters-yx5ZTtEV'
import { imageSourceGallery } from 'utils/scripts'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setViewedProd } from 'Redux/viewedProdSlice'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import ReusableFirstLetterImage from 'components/Reusable/ReusableFirstLetterImage';
const RelatedSize = ({styleCode,currentsize}) => {
    const {data,loading,error} = useQuery(GET_CHILD_INVENTORY_RELATED_COLOR_SIZE,{
        variables:{
            styleCode:styleCode
        }
    })
    const dispatch = useDispatch();
    const path = process.env.NEXT_PUBLIC_PATH;
    if(loading) return;
    if(error) return
      const view = (item:any) =>{
        dispatch(setViewedProd([item]))
      }
    return (
        {/*     <div className="colorSelection" style={{ display:'flex',flexDirection:'column' }}> */}
        <Swiper
        modules={[Navigation, Thumbs]}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        thumbs={{ swiper: thumbsSwiper }}
      >
  {data.getChildInventory_details.map((item: any) => (
      <SwiperSlide key={item.id} style={{ display: "flex", flexDirection: "column" }} onClick={() => view(item)}>
        <button style={{height:'35px',width:'50%',border:currentsize===item.size?'solid 2px brown':'solid 2px white'}}>{item.size}</button>
      </SwiperSlide>
    )
  )}
</Swiper>
  )
}
export default RelatedSize
