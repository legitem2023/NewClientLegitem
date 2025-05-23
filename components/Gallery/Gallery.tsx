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
  length: any;
  slidesPerView: number;
  spaceBetween: number;
};

export const Gallery: React.FC<PropsGallery> = ({ data, length, slidesPerView, spaceBetween }: any) => {
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  const viewedID = useSelector((state: any) => state.viewed.viewed);

  const initialSlideIndex = data.subImageFieldOut.findIndex((img: any) => img.ImagePath === viewedID);

  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      initialSlide={initialSlideIndex !== -1 ? initialSlideIndex : 0}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      loop
      style={{
        aspectRatio: '16 / 9',
      }}
    >
      {length.subImageFieldOut.length > 0 ? (
        data.subImageFieldOut.map((item: any, i: number) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src={imageSourceGallery(item)}
              onError={handleError}
              alt={`alt${i}`}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              width={1600}
              height={900}
            />
            {item.title}
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            src={`${imgPath}`}
            onError={handleError}
            alt="alt1"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            width={1600}
            height={900}
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
};
