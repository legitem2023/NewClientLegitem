'use client';

import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ReusableCustomCarousel = ({ data }) => {

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
  }];
  
  let carouselData = data && data.length > 0 ? [...data] : [...fallbackData];
 
  const galleryItems = carouselData.map((item) => ({
    original: item.image,
    thumbnail: item.image,
    description: item.Name,
  }));

  return (
    <div style={{width:"100%",boxSizing:"border-box"}}>
      <ImageGallery
        items={galleryItems}
        thumbnailPosition={`Left`}
        showPlayButton={true}
        showFullscreenButton={true}
      />
    </div>
  );
};

export default ReusableCustomCarousel;
