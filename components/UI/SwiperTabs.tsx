"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import clsx from "clsx";

const tabs = ["Tab 1", "Tab 2", "Tab 3", "Tab 4"];

export default function SwipeTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs Header */}
      <div className="flex space-x-2 border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={clsx(
              "flex-1 py-2 text-center font-medium transition-all duration-300",
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            )}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Swiper Content */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        initialSlide={activeTab}
        className="w-full"
      >
        {tabs.map((tab, index) => (
          <SwiperSlide key={index}>
            <div className="p-5 bg-gray-100 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">{tab} Content</h2>
              <p className="text-gray-600">This is the content for {tab}.</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
