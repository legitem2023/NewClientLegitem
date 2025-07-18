'use client'
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { GET_CATEGORY } from "graphql/queries";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
//import { StackedCarousel, ResponsiveContainer } from "react-stacked-center-carousel";
import { imageSource, imageSource_category } from "utils/scripts";

export default function Carousel({ data, fromData }) {
 /* const ref: any = React.useRef(StackedCarousel);
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  const pathname = usePathname();
  const Products = pathname.startsWith('/Products');

  const Card = (props: any) => {
    const { data, dataIndex }: any = props;
    const { image } = data[dataIndex];

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
*/
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
      {/*
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
      </div>*/}
    </div>
  );
}
