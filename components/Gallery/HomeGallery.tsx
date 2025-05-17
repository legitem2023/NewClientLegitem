'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid,Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { formatter, imageSource } from 'utils/scripts'; // Assuming you have utilities for formatting and image source

import { Icon } from '@iconify/react';
const HomeGallery:React.FC = () => {

  const { data:ImageData, loading:imageLoading, error:imageError } = useQuery(GET_INVENTORY_SUB_IMAGES);

  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

  if (imageLoading) return null;
  if (imageError) return null;
 
  return (
    <div className='card'>
        <div id='Gallery'>
            <div>
              <div className="slider-container">
  <Swiper
  spaceBetween={10}
  slidesPerView={2}
  grid={{
    rows: 2,
    fill: 'row',
  }}
  pagination={{
    clickable: true,
  }}
  modules={[Grid, Pagination]}
>
  {ImageData.getInv_subImage.map((item: any, i: number) => (
    <SwiperSlide key={i}>
      <Image src={item.imagePath} alt={"alt" + i} width={200} height={200} />
      <div>{item.title}</div>
    </SwiperSlide>
  ))}
</Swiper>
              </div>
            </div>
      </div>
    </div> 
  );
}
export default HomeGallery;
