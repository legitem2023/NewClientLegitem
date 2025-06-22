'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

export default function ReusableSwiperTabs({ tabs }) {
  const swiperRef = useRef(null);

  const handleTabClick = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <div style={{ left:'0px',right:'0px',margin:'auto',position:'absolute',width: '100%', height: '100%', fontFamily: 'Arial' }}>
      {/* Tab Buttons */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #ccc',
        padding: '2px',
        justifyContent: 'space-around'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '14px',
              color: '#333'
            }}
          >
            <span style={{ fontSize: '20px' }}>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Swiper Slides */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation]}
        loop={true}
        style={{ width: '100%', height: 'calc(100vh - 60px)' }}
      >
        {tabs.map((tab, index) => (
          <SwiperSlide key={index} style={{ padding: '2px' }}>
            {tab.content}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
