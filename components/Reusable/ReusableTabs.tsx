'use client';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ReusableTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleTabClick = (index) => {
    const selectedTab = tabs[index];
    if (selectedTab?.id) {
      const url = new URL(window.location.href);
      url.searchParams.set('TabB', selectedTab.id);
      router.replace(url.toString(), { scroll: false });
    }
    swiperRef.current?.slideTo(index);
    setActiveTab(index);
  };

  useEffect(() => {
    const tabIdFromParam = parseInt(searchParams.get("TabB") || "0", 10);
    if (!isNaN(tabIdFromParam) && tabIdFromParam >= 0 && tabIdFromParam < tabs.length) {
      setActiveTab(tabIdFromParam);
      swiperRef.current?.slideTo(tabIdFromParam);
    }
  }, [searchParams, tabs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      swiperRef.current?.updateAutoHeight();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div style={{ width: '100%', minHeight: '100vh', height: 'auto' }}>
      {/* Tab Buttons */}
      <div
        style={{
          display: 'flex',
          position: 'sticky',
          borderBottom: '1px solid #ccc',
          padding: '10px',
          justifyContent: 'space-around'
        }}
      >
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
              margin: '2px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '14px',
              color: '#333',
              width: '100%'
            }}
          >
            <Icon icon={tab.icon} style={{ color:'gray'}}/>
          </button>
        ))}
      </div>

      {/* Swiper Slides */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        modules={[Navigation]}
        allowTouchMove={false}
        initialSlide={activeTab}
        loop={false}
        autoHeight
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
