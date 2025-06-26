'use client';
import Image from 'next/image';
import PageFooter from '../Partial/Footer/PageFooter';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryData } from 'Redux/categoryDataSlice';
import { setProductTypeData } from 'Redux/productTypeDataSlice';
import { setCategory } from 'Redux/categorySlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { GET_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ReusableSwiperTabs({ tabs }) {
  const dispatch = useDispatch();
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const drawerState = useSelector((state: any) => state.drawer.drawer);
  const allItems = useSelector((state: any) => state.suggestedItems.suggestedItems);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<number | null>(null); // ✅ null initially
  const swiperRef = useRef<any>(null);

  const { data: cat } = useQuery(GET_CATEGORY);
  const { data: prodType } = useQuery(READ_PRODUCT_TYPES);

  if (cat) dispatch(setCategoryData(cat.getCategory));
  if (prodType) dispatch(setProductTypeData(prodType.getProductTypes));

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

  useEffect(() => {
    if (activeTab === null && tabs.length > 0) {
      const tabIdFromUrl = searchParams.get('id');
      const indexFromId = tabs.findIndex((tab) => tab.id === tabIdFromUrl);
      const defaultIndex = indexFromId !== -1 ? indexFromId : 0;
      setActiveTab(defaultIndex);
      swiperRef.current?.slideTo(defaultIndex);
    }
  }, [searchParams, tabs, activeTab]);

  useEffect(() => {
    setTimeout(() => {
      swiperRef.current?.updateAutoHeight();
    }, 50);
  }, [activeTab]);

  if (activeTab === null) return null; // ✅ wait until tab is determined

  return (
    <div style={{ left: '0px', right: '0px', margin: 'auto', position: 'absolute', width: '100%', fontFamily: 'Arial' }}>
      {/* Tab Buttons */}
      <div className="Header">
        <div className="HeaderRight">
          <div style={{padding:'5px'}}>
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
          <div></div>
        </div>
        <div className="HeaderLeft">
          <div className="Navigation">
            <div className="HeaderNav" style={{
              display: 'flex',
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
                    alignItems: 'left',
                    width:'100%',
                    margin:'0px',
                    minHeight:'40px',
                    height:'auto',
                    backgroundColor: activeTab === index ? '#572700' : 'transparent'
                  }}
                >
                  <Icon icon={tab.icon} style={{
                      color:activeTab === index ? '#ffffff' : '#572700',
                  }} />
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
        allowTouchMove={false}
        initialSlide={activeTab}
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
     <PageFooter/>
    </div>
  );
}
