'use client'
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { GET_CATEGORY } from "graphql/queries";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import { useDispatch } from 'react-redux';

import { setmodal } from 'Redux/modalSlice';
import { setviewed } from 'Redux/viewedSlice';
import { setViewedProd } from 'Redux/viewedProdSlice';

import {StackedCarousel,ResponsiveContainer} from "react-stacked-center-carousel";
import { imageSource, imageSource_category } from "utils/scripts";

export default function RecentlyVisited({data,fromData}) {
  const ref:any = React.useRef(StackedCarousel);
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  const pathname = usePathname();
  const Products = pathname.startsWith('/Products');
const dispatch = useDispatch();
 const ViewData = (data) =>{
    dispatch(setviewed(data.id));
    dispatch(setmodal(true));
    dispatch(setViewedProd([data]));
console.log(data);
}


  const Card = (props:any) => {
    const { data, dataIndex }:any = props;
    const { image } = data[dataIndex];

    return (
      <div>
      <div
        style={{
          width: "100%",
          height: 300,
          userSelect: "none",
        }}
        className="my-slide-component"
      >
        <Image
          height="100"
          width="200"
          alt={dataIndex}
          className="carouselImage"
          draggable={false}
          priority={true}
          src={image}
          onClick={()=> ViewData(data[dataIndex])}
        />
        <span style={{ color: "#000000",
                    position: "absolute", 
                    top: "0px",
                    right:"0px",
                    margin:"10px",
                    padding:"5px",
                    boxShadow:"0.5px 0.5px 3px #000000",
                    backgroundColor:"rgb(249 220 206)" }}>{data[dataIndex].Name}</span>
      </div>
      </div>
    );
  };


// if(Products) return
  return (
  <div className="card" style={{margin:"10px"}}>
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
              customScales = {[1, 0.7, 0.5, 0.2, 0.1]}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={7}
              useGrabCursor
            />
          );
        }}
      />
        <div className="card-button left" onClick={() => ref.current?.goBack()}>
              <Icon icon='ic:sharp-double-arrow' style={{ fontSize: 30 }} />
        </div>
        <div className="card-button right" onClick={() => ref.current?.goNext()}>
              <Icon icon='ic:sharp-double-arrow' style={{ fontSize: 30 }} />
        </div>
    </div>
  </div>

  );
}
