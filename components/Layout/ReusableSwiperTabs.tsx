'use client';
import Image from 'next/image';
import InstallPWAButton from '../Partial/InstallationApp/InstallPWAButton';
import EnsureTabsInUrl from './EnsureTabsInUrl';
import PageFooter from '../Partial/Footer/PageFooter';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryData } from 'Redux/categoryDataSlice';
import { setProductTypeData } from 'Redux/productTypeDataSlice';
import { setTabValue } from 'Redux/tabSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { GET_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries';
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams, useRouter } from 'next/navigation';

interface Tab {
  id: number;
  icon: string;
  content: React.ReactNode;
}

interface Props {
  tabs: Tab[];
  tabsB: Tab[];
}

export default function ReusableSwiperTabs({ tabs, tabsB }: Props) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const parentSwiperRef = useRef<any>(null);
  const childSwiperRef = useRef<any>(null);
  const tabsBSwiperRef = useRef<any>(null);

  const tabAValue = useSelector((state: any) => state.tabs.TabA);
  const tabCValue = useSelector((state: any) => state.tabs.TabC);

  const { data: cat } = useQuery(GET_CATEGORY);
  const { data: prodType } = useQuery(READ_PRODUCT_TYPES);

  useEffect(() => {
    if (cat) dispatch(setCategoryData(cat.getCategory));
    if (prodType) dispatch(setProductTypeData(prodType.getProductTypes));
  }, [cat, prodType, dispatch]);

  useEffect(() => {
    const tabId = parseInt(searchParams.get('TabA') || '0', 10);
    dispatch(setTabValue({ tab: 'TabA', value: tabId }));
    childSwiperRef.current?.slideTo(tabId);
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (parentSwiperRef.current) {
      parentSwiperRef.current.slideTo(tabCValue);
    }
  }, [tabCValue]);

  const handleTabClick = (index: number) => {
    const selectedTab = tabs[index];
    if (selectedTab?.id !== undefined) {
      const url = new URL(window.location.href);
      url.searchParams.set('TabA', selectedTab.id.toString());
      router.replace(url.toString(), { scroll: false });
      childSwiperRef.current?.slideTo(selectedTab.id);
      dispatch(setTabValue({ tab: 'TabA', value: selectedTab.id }));
    }
  };

  if (tabAValue === null) return null;

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, margin: 0, width: '100%' }}>
      <InstallPWAButton />
      <EnsureTabsInUrl />

      <div className="Header">
        <div className="HeaderRight">
          <div style={{ padding: '5px' }}>
            <Image
              src="/image/Crowd.svg"
              alt="Logo"
              width={874}
              height={373}
              className="Logo"
              style={{ height: '50px', width: 'auto' }}
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
                    backgroundColor: tabAValue === index ? '#572700' : 'transparent',
                  }}
                >
                  <Icon
                    icon={tab.icon}
                    style={{
                      color: tabAValue === index ? '#ffffff' : '#572700',
                    }}
                  />
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Parent vertical swiper */}
      <Swiper
        direction="vertical"
        onSwiper={(swiper) => (parentSwiperRef.current = swiper)}
        modules={[Navigation]}
        allowTouchMove={false}
        initialSlide={0}
        loop={false} 
        style={{ width: '100%',height:'100vh',overflow:'auto' }}
      >
        {/* Slide 0: horizontal tabs */}
        <SwiperSlide style={{ height: 'auto' }}>
          <Swiper
            onSwiper={(swiper) => (childSwiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              dispatch(setTabValue({ tab: 'TabA', value: swiper.activeIndex }));
              setTimeout(() => swiper.updateAutoHeight(), 100);
            }}
            modules={[Navigation]}
            allowTouchMove={false}
            initialSlide={tabAValue}
            loop={false}
            autoHeight
            style={{ width: '100%' }}
          >
            {tabs.map((tab, index) => (
              <SwiperSlide key={index}>
                <div style={{ display: tabAValue === index ? 'block' : 'none' }}>
                  {tab.content}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperSlide>

        {/* Slide 1: secondary swiper */}
        {tabCValue===1?(
        <SwiperSlide style={{ height: 'auto' }}>
          <Swiper
            onSwiper={(swiper) => (tabsBSwiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setTimeout(() => swiper.updateAutoHeight(), 100);
            }}
            modules={[Navigation]}
            allowTouchMove={false}
            loop={false}
            autoHeight
            style={{ width: '100%' }}
          >
            {tabsB.map((tab, index) => (
              <SwiperSlide key={index}>
                <div style={{ display: tabCValue === index ? 'block' : 'none' }}>
                  {tab.content}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperSlide>):null
      </Swiper>

      <PageFooter />
    </div>
  );
}
