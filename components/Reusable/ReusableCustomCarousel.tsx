'use client';

import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

type CarouselItem = {
  Name: string;
  image: string;
};

type Props = {
  data: CarouselItem[];
  onImageClick?: (item: CarouselItem) => void;
};

const ReusableCustomCarousel: React.FC<Props> = ({ data, onImageClick = () => {} }) => {
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
        onClick={(e) => {
          const index = (e?.target as any)?.closest('[data-index]')?.getAttribute('data-index');
          if (index !== null && index !== undefined) {
            const idx = parseInt(index);
            if (!isNaN(idx)) onImageClick(data[idx]);
          }
        }}
      />
    </div>
  );
};

export default ReusableCustomCarousel;
