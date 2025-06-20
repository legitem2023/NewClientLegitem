import React from 'react'
import { GET_CHILD_INVENTORY_RELATED_COLOR_SIZE } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { i } from 'vitest/dist/reporters-yx5ZTtEV'
import { imageSourceGallery } from 'utils/scripts'
import Image from 'next/image'
import Link from 'next/link'
import ReusableFirstLetterImage from 'components/Reusable/ReusableFirstLetterImage';
import { useDispatch } from 'react-redux';
import { setViewedProd } from 'Redux/viewedProdSlice';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
const RelatedColor = ({styleCode,currentcolor}) => {
    const {data,loading,error} = useQuery(GET_CHILD_INVENTORY_RELATED_COLOR_SIZE,{
        variables:{
            styleCode:styleCode
        }
    })
    const path = process.env.NEXT_PUBLIC_PATH;
    const dispatch = useDispatch();
    if(loading) return;
    if(error) return

      const view = (item:any) =>{
        dispatch(setViewedProd([item]))
      }

    return (
     <Swiper
      modules={[Navigation, Thumbs]}
      slidesPerView={6}
      spaceBetween={10}
      watchSlidesProgress>
        {
        data.getChildInventory_details.map((item:any)=>(
    <SwiperSlide
          key={item.id}
          style={{
            borderRadius:'100%',
          }}
          onClick={() => view(item)}> 
  <ReusableFirstLetterImage
    text={item.color}
    size={100}
    bgColor={currentcolor===item.color?'#ff9999':'rgb(87, 39, 0)'}
    textColor="#ffffff"
  /></SwiperSlide>))
    }</Swiper>
  )
}

export default RelatedColor
