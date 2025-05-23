'use client'
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { GET_CATEGORY } from "graphql/queries";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setmodal } from 'Redux/modalSlice';
import { setviewed } from 'Redux/viewedSlice';
import { setViewedProd } from 'Redux/viewedProdSlice';

import { StackedCarousel, ResponsiveContainer } from "react-stacked-center-carousel";
import { imageSource, imageSource_category } from "utils/scripts";

const fallbackData = [
  {
    "Name": "Product 1",
    "image": "https://example.com/images/product1.jpg"
  },
  {
    "Name": "Product 2",
    "image": "https://example.com/images/product2.jpg"
  },
  {
    "Name": "Product 3",
    "image": "https://example.com/images/product3.jpg"
  },
  {
    "Name": "Product 4",
    "image": "https://example.com/images/product4.jpg"
  },
  {
    "Name": "Product 5",
    "image": "https://example.com/images/product5.jpg"
  },
  {
    "Name": "Product 6",
    "image": "https://example.com/images/product6.jpg"
  }
];

export default function RecentlyVisited({ data, fromData }) {
  const ref: any = React.useRef(StackedCarousel);
  const pathname = usePathname();
  const Products = pathname.startsWith('/Products');
  const dispatch = useDispatch();

  const ViewData = (data) => {
    dispatch(setviewed(data.thumbnail));
    dispatch(setmodal(true));
    dispatch(setViewedProd([data]));
    console.log(data);
  }

  const Card = (props: any) => {
    const { data, dataIndex }: any = props;
    const { image } = data[dataIndex];

const [finalImage, setFinalImage] = useState<string>("");

  useEffect(() => {
    if (!image) {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#333";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("No Viewed Products", canvas.width / 2, canvas.height / 2);

        const dataUrl = canvas.toDataURL();
        setFinalImage(dataUrl);
      }
    } else {
      setFinalImage(image);
    }
  }, [image]);



    
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          backgroundColor: "#c0c0c0",
          position: "relative"
        }}
        className="my-slide-component"
      >
        <Image
          height={300}
          width={400}
          style={{aspectRatio:'4 / 3',width:'100%'}}
          alt={dataIndex}
          className="carouselImage"
          draggable={false}
          priority={true}
          src={image}
        />
        <span
          style={{
            color: "#000000",
            position: "absolute",
            top: "0px",
            right: "0px",
            margin: "10px",
            padding: "5px",
            boxShadow: "0.5px 0.5px 3px #000000",
            backgroundColor: "rgb(249 220 206)"
          }}
        >
          {data[dataIndex].Name}
        </span>
      </div>
    );
  };

  // Ensure at least 6 items in carouselData
  const MIN_ITEMS = 6;
  let carouselData = data && data.length > 0 ? [...data] : [...fallbackData];

  if (carouselData.length < MIN_ITEMS) {
    const original = [...carouselData];
    while (carouselData.length < MIN_ITEMS) {
      carouselData = [...carouselData, ...original];
    }
    carouselData = carouselData.slice(0, MIN_ITEMS);
  }

  return (
    <div
      className="card"
      style={{
        width: '100%',
        aspectRatio:'5 / 3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: "100%", position: "relative" }}>
        <ResponsiveContainer
          carouselRef={ref}
          render={(parentWidth, carouselRef) => {
            let currentVisibleSlide = 5;
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Card}
                slideWidth={parentWidth < 200 ? parentWidth : 400}
                carouselWidth={parentWidth}
                data={data}
                customScales={[1, 0.7, 0.5, 0.2, 0.1]}
                currentVisibleSlide={currentVisibleSlide}
                maxVisibleSlide={7}
                useGrabCursor
              />
            );
          }}
        />
        <div
          className="card-button left"
          onClick={() => ref.current?.goBack()}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 1
          }}
        >
          <Icon icon='ic:sharp-double-arrow' style={{ fontSize: 30, color: "rgb(87,39,0)", transform: "rotate(180deg)" }} />
        </div>
        <div
          className="card-button right"
          onClick={() => ref.current?.goNext()}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 1
          }}
        >
          <Icon icon='ic:sharp-double-arrow' style={{ fontSize: 30, color: "rgb(87,39,0)" }} />
        </div>
      </div>
    </div>
  );
}
