import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { handleError, imageSourceGallery } from 'utils/scripts';
import { useSelector } from 'react-redux';

type PropsGallery = {
  data: (item: string) => void;
  length:any,
  slidesPerView:number,
  spaceBetween:number
}

export const Gallery:React.FC<PropsGallery> = ({data,length,slidesPerView,spaceBetween}:any) => {
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  const viewedID = useSelector((state:any) => state.viewed.viewed); // Access category state

  const initialSlideIndex = data.subImageFieldOut.findIndex((img) => img.id.toString() === viewedID.toString());
  console.log(data.subImageFieldOut);
  console.log(viewedID);
  return (
      <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      initialSlide={initialSlideIndex !== -1 ? initialSlideIndex : 0}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      loop={true}>
      {length.subImageFieldOut.length > 0?
        data.subImageFieldOut.map((item:any, i:any) => (
        <SwiperSlide key={i}>
            <Image key={i} 
                   src={imageSourceGallery(item)} 
                   onError={handleError}
                   alt={"alt" + i} 
                   width='400' height='350' />
            {item.title}
        </SwiperSlide>
      )):<SwiperSlide>
      <Image src={`${imgPath}`} 
             onError={handleError}
             alt={"alt" + 1} 
             width='400' height='350'/>
        </SwiperSlide>
      }
    </Swiper>
  );
};
