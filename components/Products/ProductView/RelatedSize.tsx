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
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/scrollbar';
import ReusableFirstLetterImage from 'components/UI/ReusableFirstLetterImage';
const RelatedSize = ({styleCode}) => {
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
        console.log([item]);
        dispatch(setViewedProd([item]))
      }
    return (
        /*    <Swiper
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            loop={false}>
            {data.getChildInventory_details.map((item:any, i:any) => (
              <SwiperSlide key={i} className="border-2 border-gray-300" onClick={()=>view(item)}>
                  {item.size}
              </SwiperSlide>
            ))
            }
          </Swiper>*/
     <div className='colorSelection' style={{backgroundColor:'red'}}>{
         data.getChildInventory_details.map((item:any)=>(
             <div key={item.id} onClick={()=>view(item)}>
                <ReusableFirstLetterImage
                  text={item.size}
                  size={100}
                  bgColor="rgb(87, 39, 0)"
                  textColor="#ffffff"
                />
             </div>
         ))
     }</div>
  )
}

export default RelatedSize
