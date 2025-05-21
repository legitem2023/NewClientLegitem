'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Icon } from '@iconify/react'
import CanvasTextImage from '../UI/CanvasTextImage'

const ReusableSlideNames = ({ data }: { data: { Name: string }[] }) => {
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const [navigationReady, setNavigationReady] = useState(false)

  useEffect(() => {
    // Wait until refs are set
    if (prevRef.current && nextRef.current) {
      setNavigationReady(true)
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        aspectRatio: '16 / 4.5',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          aspectRatio: '16 / 4.5',
          boxSizing: 'border-box',
        }}
      >
        {navigationReady && (
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={false}
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              boxSizing: 'border-box',
            }}
          >
            {data.map((item, idx) => (
              <SwiperSlide
                key={idx}
                style={{
                  textAlign: 'left',
                  width: '100%',
                  height: '100%',
                }}
              >
                <CanvasTextImage text={item.Name} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation Buttons */}
        <div
          ref={prevRef}
          style={{
            position: 'absolute',
            left: '10px',
            zIndex: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon
            icon="ic:sharp-arrow-circle-right"
            style={{ transform: 'rotate(180deg)', fontSize: 36, color: '#333' }}
          />
        </div>
        <div
          ref={nextRef}
          style={{
            position: 'absolute',
            right: '10px',
            zIndex: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon icon="ic:sharp-arrow-circle-right" style={{ fontSize: 36, color: '#333' }} />
        </div>
      </div>
    </div>
  )
}

export default ReusableSlideNames
