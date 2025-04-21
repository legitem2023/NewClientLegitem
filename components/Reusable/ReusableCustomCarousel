'use client';

import React from 'react';
import ImageCarousel from 'react-image-carousel';
import 'react-image-carousel/lib/ImageCarousel.css';

type CarouselItem = {
  Name: string;
  image: string;
};

type Props = {
  data: CarouselItem[];
  onImageClick?: (item: CarouselItem) => void;
};

const ReusableCustomCarousel: React.FC<Props> = ({ data, onImageClick = () => {} }) => {
  const imageUrls = data.map((item) => item.image);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ImageCarousel
        images={imageUrls}
        thumb={true}
        loop={true}
        autoPlay={true}
        onClick={(index: number) => onImageClick(data[index])}
      />
    </div>
  );
};

export default ReusableCustomCarousel;
