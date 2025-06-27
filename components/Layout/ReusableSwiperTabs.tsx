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
}

export default function ReusableSwiperTabs({ tabs }: Props) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  const tabAValue = useSelector((state: any) => state.tabs.TabA);

  const { data: cat } = useQuery(GET_CATEGORY);
  const { data: prodType } = useQuery(READ_PRODUCT_TYPES);

  useEffect(() => {
    if (cat) dispatch(setCategoryData(cat.getCategory));
    if (prodType) dispatch(setProductTypeData(prodType.getProductTypes));
  }, [cat, prodType, dispatch]);

  useEffect(() => {
    const tabId = parseInt(searchParams.get('TabA') || '0', 10);
    dispatch(setTabValue({ tab: 'TabA', value: tabId }));
    swiperRef.current?.slideTo(tabAValue);
  }, [searchParams, tabs, tabAValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      swiperRef.current?.updateAutoHeight();
    }, 50);
    return () => clearTimeout(timer);
  }, [tabAValue]);

  const handleTabClick = (index: number) => {
    const selectedTab = tabs[index];
    if (selectedTab?.id !== undefined) {
      const url = new URL(window.location.href);
      url.searchParams.set('TabA', selectedTab.id.toString());
      router.replace(url.toString(), { scroll: false });
      swiperRef.current?.slideTo(selectedTab.id);
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
<Swiper
    direction='vertical'
    onSwiper={(swiper) => (swiperRef.current = swiper)}
    modules={[Navigation]}
    allowTouchMove={true}
    initialSlide={tabAValue}
    loop={false}
    autoHeight
    style={{ width: '100%' }}
  >
  <SwiperSlide>
        <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => dispatch(setTabValue({ tab: 'TabA', value: swiper.activeIndex }))}
        modules={[Navigation]}
        allowTouchMove={false}
        initialSlide={tabAValue}
        loop={false}
        autoHeight
        style={{ width: '100%' }}
      >
        {tabs.map((tab, index) => (
          <SwiperSlide key={index}>{tab.content}</SwiperSlide>
        ))}
      </Swiper>
  </SwiperSlide>
  <SwiperSlide></SwiperSlide>
</Swiper>


      <PageFooter />
    </div>
  );
}
