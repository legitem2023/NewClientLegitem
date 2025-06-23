'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryData } from 'Redux/categoryDataSlice';
import { setProductTypeData } from 'Redux/productTypeDataSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { GET_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';

export default function ReusableSwiperTabs({ tabs }) {
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const drawerState = useSelector((state: any) => state.drawer.drawer);
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);

  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<any>(null);

  const { data: cat, loading: catload } = useQuery(GET_CATEGORY);
  const { data: prodType, loading: prodTypeload } = useQuery(READ_PRODUCT_TYPES);

  //if (catload) return <Loading />;
  if (cat) dispatch(setCategoryData(cat.getCategory));
  if (prodType) dispatch(setProductTypeData(prodType.getProductTypes));

  const handleTabClick = (index) => {
    swiperRef.current?.slideTo(index);
    setActiveTab(index);
  };

  // Ensure Swiper updates height on tab change or content change
  useEffect(() => {
    setTimeout(() => {
      swiperRef.current?.updateAutoHeight();
    }, 50); // Delay needed to allow DOM to update
  }, [activeTab]);

  return (
    <div style={{ left: '0px', right: '0px', margin: 'auto', position: 'absolute', width: '100%', fontFamily: 'Arial' }}>
      {/* Tab Buttons */}
      <div className="Header">
      <div className="HeaderRight">
        <div>
            <Image
              src="/image/Crowd.svg"
              alt="Logo"
              width={874}
              height={373}
              className='Logo'
              
              onError={(e) => {
                console.error('Image failed to load', e);
              }}
            />
          </div>
        <div>
        </div>
      </div>
      <div className="HeaderLeft">
        <div className="Navigation">
      <div className="HeaderNav" style={{
        display: 'flex',
        padding:'2px',
        justifyContent: 'space-around'
      }}>
        {tabs.map((tab, index) => (
          <nav
            key={index}
            onClick={() => handleTabClick(index)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '14px',
              width:'100%',
              margin:'0px',
              height:'100%',
            
              backgroundColor: activeTab === index ? '#572700' : 'transparent',
              fontWeight: activeTab === index ? 'bold' : 'normal'
            }}
          >
            <Icon icon={tab.icon} style={{
                color:activeTab === index ? '#ffffff' : '#572700',
            }} />
            {/*<span>{tab.name}</span>*/}
          </nav>
        ))}
      </div>
        </div>
    </div>
    </div>
      {/* Swiper Slides */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        modules={[Navigation]}
        loop={false}
        autoHeight={true}
        style={{ width: '100%' }}
      >
        {tabs.map((tab, index) => (
          <SwiperSlide key={index}>
              {tab.content} 
          </SwiperSlide>
        ))}
      </Swiper>
     
    </div>
  );
}
