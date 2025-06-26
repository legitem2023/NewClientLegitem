'use client';
import Image from 'next/image';
import PageFooter from '../Partial/Footer/PageFooter';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setCategoryData } from 'Redux/categoryDataSlice';
import { setProductTypeData } from 'Redux/productTypeDataSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { GET_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ReusableSwiperTabs({ tabs }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  const { data: cat } = useQuery(GET_CATEGORY);
  const { data: prodType } = useQuery(READ_PRODUCT_TYPES);

  // Dispatch GraphQL data to store
  useEffect(() => {
    if (cat) dispatch(setCategoryData(cat.getCategory));
    if (prodType) dispatch(setProductTypeData(prodType.getProductTypes));
  }, [cat, prodType, dispatch]);

  // Set initial active tab from URL
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

  const handleTabClick = (index: number) => {
    const selectedTab = tabs[index];
    if (selectedTab?.id) {
      const url = new URL(window.location.href);
      url.searchParams.set('id', selectedTab.id);
      router.push(url.toString(), { scroll: false });
    }
    swiperRef.current?.slideTo(index);
    setActiveTab(index);
  };

  if (activeTab === null) return null;

  return (
    <div style={{ position: 'absolute', width: '100%', fontFamily: 'Arial' }}>
      {/* Header */}
      <div className="Header">
        <div className="HeaderRight">
          <div style={{ padding: '5px' }}>
            <Image
              src="/image/Crowd.svg"
              alt="Logo"
              width={874}
              height={373}
              className='Logo'
              onError={(e) => console.error('Image failed to load', e)}
            />
          </div>
        </div>
        <div className="HeaderLeft">
          <div className="Navigation">
            <div className="HeaderNav" style={{ display: 'flex', justifyContent: 'space-around' }}>
              {tabs.map((tab, index) => (
                <nav
                  key={index}
                  onClick={() => handleTabClick(index)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    minHeight: '40px',
                    backgroundColor: activeTab === index ? '#572700' : 'transparent'
                  }}
                >
                  <Icon icon={tab.icon} style={{
                    color: activeTab === index ? '#ffffff' : '#572700',
                  }} />
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swiper Content */}
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
          <SwiperSlide key={index}>{tab.content}</SwiperSlide>
        ))}
      </Swiper>

      <PageFooter />
    </div>
  );
}
