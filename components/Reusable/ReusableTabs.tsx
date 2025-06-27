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
  const handleTabClick = (index) => {
    
const selectedTab = tabs[index];
    if (selectedTab?.id) {
      const url = new URL(window.location.href);
      url.searchParams.set('id', selectedTab.id);
      router.replace(url.toString(), { scroll: false });
    }
    swiperRef.current?.slideTo(index);
    setActiveTab(index);
    
    //swiperRef.current?.slideToLoop(index);
  };
  useEffect(() => {
    const tabId = parseInt(searchParams.get("TabB") || "0", 10);
    setActiveTab(tabId);
    swiperRef.current?.slideTo(tabId);
  }, [searchParams, tabs]);
 useEffect(() => {
    const tabId = parseInt(searchParams.get("id") || "0", 10);
    setActiveTab(tabId);
    swiperRef.current?.slideTo(tabId);
  }, [searchParams, tabs]);

  // Update swiper height when tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      swiperRef.current?.updateAutoHeight();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  if (activeTab === null) return null;
  return (
    <div style={{ width: '100%',minHeight:'100vh', height: auto' }}>
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
