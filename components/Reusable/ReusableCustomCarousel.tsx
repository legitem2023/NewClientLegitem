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
  
  const galleryItems = data.map((item) => ({
    original: item.image,
    thumbnail: item.image,
    description: item.Name,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ImageGallery
        items={galleryItems}
        showPlayButton={true}
        showFullscreenButton={true}
      />
    </div>
  );
};

export default ReusableCustomCarousel;
