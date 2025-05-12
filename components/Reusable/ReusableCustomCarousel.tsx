'use client';

import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Icon } from '@iconify/react'; // Import Iconify
import 'react-image-gallery/styles/css/image-gallery.css';
import { useSelector } from 'react-redux';
const ReusableCustomCarousel = ({ data,showthumbs,thumbpos }) => {
//const viewedID = useSelector((state:any) => state.viewed.viewed);
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

  let carouselData = data && data.length > 0 ? [...data] : [...fallbackData];
  const viewedID = useSelector((state:any) => state.viewed.viewed); // Access category state
  const initialSlideIndex = parseInt(data.subImageFieldOut.findIndex((img) => img.ImagePath === viewedID));
  console.log(initialSlideIndex,"<*")
  
  // const initialSlideIndex = data.subImageFieldOut.findIndex((img) => img.ImagePath === viewedID);
  // Custom Thumbnail component with loading spinner
  const ThumbnailWithLoader = ({ thumbnail }) => {
    const [loading, setLoading] = useState(true);

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}>
            <Icon 
              icon="eos-icons:loading" 
              width="24" 
              height="24" 
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </div>
        )}
        <img
          src={thumbnail}
          alt="thumbnail"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: loading ? 0 : 1 }}
          onLoad={() => setLoading(false)}
        />
        {/* Add custom spin animation if needed */}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };

  // Map gallery items
  const galleryItems = carouselData.map((item) => ({
    original: item.image,
    thumbnail: item.image,
    description: item.Name,
    renderThumbInner: () => <ThumbnailWithLoader thumbnail={item.image} />
  }));

  return (
    <div style={{ width: "100%", boxSizing: "border-box",height:"100%" }}>
      <ImageGallery
        items={galleryItems}
        thumbnailPosition={thumbpos}
        
        showThumbnails={showthumbs}
        showPlayButton={true}
        showFullscreenButton={true}
      />
    </div>
  );
};

export default ReusableCustomCarousel;
