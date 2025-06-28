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
  const tabCValue = useSelector((state: any) => state.tabs.TabC); // Used?

  const { data: cat } = useQuery(GET_CATEGORY);
  const { data: prodType } = useQuery(READ_PRODUCT_TYPES);

  // Fetch GraphQL data
  useEffect(() => {
    if (cat) dispatch(setCategoryData(cat.getCategory));
    if (prodType) dispatch(setProductTypeData(prodType.getProductTypes));
  }, [cat, prodType, dispatch]);

  // Sync tab with URL param
  useEffect(() => {
    const tabId = parseInt(searchParams.get('TabA') || '0', 10);
    dispatch(setTabValue({ tab: 'TabA', value: tabId }));
    mainSwiperRef.current?.slideTo(tabId);
  }, [searchParams, dispatch]);

  const handleTabClick = useCallback((index: number) => {
    const selectedTab = tabs[index];
    if (selectedTab?.id !== undefined) {
      const url = new URL(window.location.href);
      url.searchParams.set('TabA', selectedTab.id.toString());
      router.replace(url.toString(), { scroll: false });
      dispatch(setTabValue({ tab: 'TabA', value: index }));
      mainSwiperRef.current?.slideTo(index);
    }
  }, [tabs, dispatch, router]);

  if (tabAValue === null) return null;

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, width: '100%' }}>
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
                  key={tab.id}
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

      <Swiper
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          dispatch(setTabValue({ tab: 'TabA', value: swiper.activeIndex }));
          setTimeout(() => swiper.updateAutoHeight(), 100);
        }}
        modules={[Navigation]}
        allowTouchMove={true}
        initialSlide={tabAValue}
        loop={false}
        autoHeight
        style={{ width: '100%' }}
      >
        {tabs.map((tab, index) => (
          <SwiperSlide key={`main-tab-${index}`}>
            <div style={{ padding: '0px' }}>{tabAValue === index && tab.content}</div>
          </SwiperSlide>
        ))}

        <SwiperSlide key="tabsB-wrapper">
          <Swiper
            onSwiper={(swiper) => (tabsBSwiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setTimeout(() => swiper.updateAutoHeight(), 100);
            }}
            modules={[Navigation]}
            allowTouchMove={true}
            loop={false}
            autoHeight
            style={{ width: '100%', minHeight: '100vh', height: 'auto' }}
          >
            {tabsB.map((tab, index) => (
              <SwiperSlide key={`tabsB-${index}`}>
                <div style={{ textAlign: 'left' }}>{tab.content}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperSlide>
      </Swiper>

      <PageFooter />
    </div>
  );
};

// ✅ Wrap with React.memo
export default memo(ReusableSwiperTabs);
