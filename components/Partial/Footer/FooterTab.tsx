'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setTabValue } from 'Redux/tabSlice'

const FooterTab: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  // Example placeholder tabs if needed
  const tabs = [0, 1, 2, 3, 4, 5, 6] // Adjust as needed

  // Mock swiperRef; you should replace it with actual ref passed as prop or managed via context
  const mainSwiperRef = useRef<any>(null)

  const handleTabClick = useCallback(
    (index: number) => {
      const selectedTab = index
      const params = new URLSearchParams(window.location.search)
      params.set('TabA', selectedTab.toString())

      // Update the URL without scrolling
      router.replace(`?${params.toString()}`)

      // Fallback for Safari
      window.history.replaceState({}, '', `?${params.toString()}`)

      // Dispatch to Redux store
      dispatch(setTabValue({ tab: 'TabA', value: index }))

      // Slide swiper (if ref is valid)
      setTimeout(() => {
        mainSwiperRef.current?.slideTo?.(index)
      }, 50)
    },
    [dispatch, router, tabs]
  )

  return (
    <div className="footer">
      <div className="FootHeader">
        <Icon icon="logos:tiktok-icon" />
        <Icon icon="entypo-social:facebook" style={{ color: '#104291' }} />
        <Icon icon="entypo-social:instagram" style={{ color: '#d609ad' }} />
        <Icon icon="entypo-social:youtube" style={{ color: '#ff0000' }} />
      </div>

      <div className="FootCenter">
        <span className="foot_label" onClick={() => handleTabClick(6)}>
          About Legitem
        </span>
        <span className="foot_label" onClick={() => handleTabClick(7)}>
          FAQ
        </span>
        <span className="foot_label" onClick={() => handleTabClick(8)}>
          Disclaimer
        </span>
        <span className="foot_label" onClick={() => handleTabClick(9)}>
          Privacy
        </span>
        <span className="foot_label" onClick={() => handleTabClick(10)}>
          Contact Us
        </span>
      </div>

      <div className="FootFooter">All Rights Reserved ©2024</div>
    </div>
  )
}

export default FooterTab
