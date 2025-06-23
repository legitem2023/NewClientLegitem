'use client';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryData } from 'Redux/categoryDataSlice';
import { setProductTypeData } from 'Redux/productTypeDataSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { GET_CATEGORY, GET_CHILD_INVENTORY, READ_PRODUCT_TYPES } from 'graphql/queries';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';

export default function ReusableSwiperTabs({ tabs }) {
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const drawerState = useSelector((state: any) => state.drawer.drawer);
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);

  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const { data: cat, loading: catload } = useQuery(GET_CATEGORY);
  const { data: prodType, loading: prodTypeload } = useQuery(READ_PRODUCT_TYPES);
  const [activeTab, setActiveTab] = useState(0);

  if (catload) return <Loading />;
  if (cat) {
    dispatch(setCategoryData(cat.getCategory));
  }
  if (prodType) {
    dispatch(setProductTypeData(prodType.getProductTypes));
  }

  const swiperRef = useRef(null);

  const handleTabClick = (index) => {
    swiperRef.current?.slideToLoop(index);
    setActiveTab(index);
  };

  return (
    <div style={{ left: '0px', right: '0px', margin: 'auto', position: 'absolute', width: '100%', height: '100%', fontFamily: 'Arial' }}>
      {/* Tab Buttons */}
      <div className="HeaderNav" style={{
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
              color: activeTab === index ? '#007bff' : '#333', // Active tab color
              fontWeight: activeTab === index ? 'bold' : 'normal' // Optional: bold text
            }}
          >
            <Icon icon={tab.icon} />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Swiper Slides */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        modules={[Navigation]}
        loop={false}
        autoHeight={true}
        style={{ width: '100%', height: 'auto', overflow: 'auto' }}
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
