'use client';

import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ReusableCustomCarousel = ({ data }) => {
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
