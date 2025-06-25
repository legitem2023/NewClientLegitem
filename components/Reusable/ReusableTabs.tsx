'use client';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import React, { useState, useRef, useEffect } from 'react';

export default function ReusableTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef(null);

  const handleTabClick = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'Arial' }}>
      {/* Tab Buttons */}
      <div style={{
        display: 'flex',
        position:'sticky',
        borderBottom: '1px solid #ccc',
        padding: '10px',
        justifyContent: 'space-around'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            style={{
              background: activeTab === index ? 'white' : '#d0d0d0',
              border: 'solid 1px #c0c0c0',
              borderBottom: activeTab === index ? 'none' : 'solid 1px #c0c0c0',
              borderRadius: '5px 5px 0px 0px',
              cursor: 'pointer',
              padding: '10px',
              margin:'2px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '14px',
              color: '#333',
              width: '100%'
            }}
          >
            <Icon icon={tab.icon} />
          </button>
        ))}
      </div>

      {/* Swiper Slides */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        modules={[Navigation]}
        allowTouchMove={false}
        loop={false}
        autoHeight={true}
        style={{ width: '100%' }}
      >
        {tabs.map((tab, index) => (
          <SwiperSlide key={index} style={{ padding: '0px' }}>
            {tab.content}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
