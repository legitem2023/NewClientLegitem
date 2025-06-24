'use client'; // Only needed in Next.js App Router with client components

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper/modules';

const ReusableSwipeMenu = () => {
  const menuItems = ['Home', 'About', 'Services', 'Contact', 'Blog'];

  return (
    <div style={{ width: '100%', padding: '10px 0', background: '#f5f5f5' }}>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        style={{ paddingLeft: '10px' }}
      >
        {menuItems.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{
              flexShrink: 0,
              width: 'auto',
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1'][index % 5],
              color: index === 2 ? 'black' : 'white',
              borderRadius: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReusableSwipeMenu;
