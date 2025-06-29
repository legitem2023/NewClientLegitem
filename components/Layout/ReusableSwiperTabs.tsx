'use client';
import React, { useEffect, useRef, memo, useCallback } from 'react';
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

const ReusableSwiperTabs = ({ tabs, tabsB }: Props) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mainSwiperRef = useRef<any>(null);
  const tabsBSwiperRef = useRef<any>(null);

  const tabAValue = useSelector((state: any) => state.tabs.TabA);

  const { data: cat } = useQuery(GET_CATEGORY);
  const { data: prodType } = useQuery(READ_PRODUCT_TYPES);

  useEffect(() => {
    if (cat) dispatch(setCategoryData(cat.getCategory));
    if (prodType) dispatch(setProductTypeData(prodType.getProductTypes));
  }, [cat, prodType, dispatch]);

  useEffect(() => {
    const tabId = parseInt(searchParams.get('TabA') || '0', 10);
    if (!isNaN(tabId)) {
      dispatch(setTabValue({ tab: 'TabA', value: tabId }));
      // Add delay for Safari to ensure Swiper is ready
      setTimeout(() => {
        mainSwiperRef.current?.slideTo(tabId);
      }, 50);
    }
  }, [searchParams, dispatch]);

  const handleTabClick = useCallback((index: number) => {
    const selectedTab = tabs[index];
    if (selectedTab?.id !== undefined) {
      const params = new URLSearchParams(window.location.search);
      params.set('TabA', selectedTab.id.toString());
      // Use both replace and pushState for Safari compatibility
      router.replace(`?${params.toString()}`, { scroll: false });
      window.history.replaceState({}, '', `?${params.toString()}`);
      
      dispatch(setTabValue({ tab: 'TabA', value: index }));
      setTimeout(() => {
        mainSwiperRef.current?.slideTo(index);
      }, 50);
    }
  }, [tabs, dispatch, router]);

  if (tabAValue === null) return null;

  return (
    <div style={{ 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      top: 0, 
      width: '100%',
      WebkitOverflowScrolling: 'touch' // Safari momentum scrolling
    }}>
      <InstallPWAButton />
      <EnsureTabsInUrl />

      <div className="Header" style={{ WebkitTransform: 'translate3d(0,0,0)' }}>  
        <div className="HeaderRight">  
          <div style={{ padding: '5px' }}>  
            <Image  
              src="/image/Crowd.svg"  
              alt="Logo"  
              width={874}  
              height={373}  
              className="Logo"  
              style={{ 
                height: '50px', 
                width: 'auto',
                maxWidth: '100%' // Safari image sizing fix
              }}  
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/image/fallback-logo.png';
              }}  
            />  
          </div>  
        </div>  
        <div className="HeaderLeft">  
          <div className="Navigation">  
            <div className="HeaderNav" style={{ 
              display: 'flex', 
              justifyContent: 'space-around',
              WebkitBoxPack: 'justify' // Safari flexbox fallback
            }}>  
              {tabs.map((tab, index) => (  
                <nav  
                  key={tab.id}  
                  onClick={() => handleTabClick(index)}  
                  style={{  
                    cursor: 'pointer',  
                    display: 'flex',  
                    flexDirection: 'column',  
                    width: '100%',  
                    minHeight: '40px',  
                    backgroundColor: tabAValue === index ? '#572700' : 'transparent',
                    WebkitTapHighlightColor: 'transparent' // Remove Safari tap highlight
                  }}  
                >  
                  <Icon  
                    icon={tab.icon}  
                    style={{  
                      color: tabAValue === index ? '#ffffff' : '#572700',  
                      fontSize: '24px' // Ensure consistent size in Safari
                    }}  
                  />  
                </nav>  
              ))}  
            </div>  
          </div>  
        </div>  
      </div>  

      <Swiper  
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}  
        onSlideChange={(swiper) => {  
          dispatch(setTabValue({ tab: 'TabA', value: swiper.activeIndex }));  
          // More robust height update for Safari
          setTimeout(() => {
            swiper.updateAutoHeight();
            if (tabsBSwiperRef.current) tabsBSwiperRef.current.updateAutoHeight();
          }, 300);  
        }}  
        modules={[Navigation]}  
        allowTouchMove={false}  
        initialSlide={tabAValue}  
        loop={false}  
        autoHeight  
        style={{ 
          width: '100%',
          WebkitTransform: 'translate3d(0,0,0)' // Hardware acceleration
        }}  
      >  
        {tabs.map((tab, index) => (  
          <SwiperSlide key={`main-tab-${index}`}>  
            <div style={{ 
              padding: '0px',
              textAlign: 'left',
              minHeight: '1px' // Safari height calculation fix
            }}>{tab.content}</div>  
          </SwiperSlide>  
        ))}  

        <SwiperSlide key="tabsB-wrapper">  
          <Swiper  
            onSwiper={(swiper) => (tabsBSwiperRef.current = swiper)}  
            onSlideChange={(swiper) => {  
              setTimeout(() => {
                swiper.updateAutoHeight();
                if (mainSwiperRef.current) mainSwiperRef.current.updateAutoHeight();
              }, 300);  
            }}  
            modules={[Navigation]}  
            allowTouchMove={false}  
            loop={false}  
            autoHeight  
            style={{ 
              width: '100%', 
              minHeight: '100vh', 
              height: 'auto',
              WebkitTransform: 'translate3d(0,0,0)'
            }}  
          >  
            {tabsB.map((tab, index) => (  
              <SwiperSlide key={`tabsB-${index}`}>  
                <div style={{ 
                  textAlign: 'left',
                  minHeight: '1px' // Safari height calculation fix
                }}>{tab.content}</div>  
              </SwiperSlide>  
            ))}  
          </Swiper>  
        </SwiperSlide>  
      </Swiper>  

      <PageFooter />  
    </div>
  );
};

export default memo(ReusableSwiperTabs);
