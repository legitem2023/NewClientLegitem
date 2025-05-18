import React, { Component } from "react";
import Slider from "react-slick";
import "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css";
import "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css";
//import { baseUrl } from "./config";
function ReusableSlick() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';

  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
        <div>
          <img src={"https://tsbriguuaznlvwbnylop.supabase.co/storage/v1/object/public/legitemfiles/ProductImages/Product-2025-1-1-12-15054.webp"} />
        </div>
      </Slider>
    </div>
  );
}

export default ReusableSlick;
