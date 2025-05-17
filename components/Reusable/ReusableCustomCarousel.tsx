'use client';

import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Icon } from '@iconify/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useSelector } from 'react-redux';

const ReusableCustomCarousel = ({ data, showthumbs, thumbpos }) => {
  const fallbackData = [
    { Name: "Product 1", image: "https://example.com/images/product1.jpg" },
    { Name: "Product 2", image: "https://example.com/images/product2.jpg" },
    { Name: "Product 3", image: "https://example.com/images/product3.jpg" },
    { Name: "Product 4", image: "https://example.com/images/product4.jpg" },
    { Name: "Product 5", image: "https://example.com/images/product5.jpg" },
    { Name: "Product 6", image: "https://example.com/images/product6.jpg" }
  ];

  let carouselData = data && data.length > 0 ? [...data] : [...fallbackData];

  const ThumbnailWithLoader = ({ thumbnail }) => {
    const [loading, setLoading] = useState(true);

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', boxSizing: "border-box" }}>
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
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };

  const galleryItems = carouselData.map((item) => ({
    original: item.image,
    thumbnail: item.image,
    description: item.Name,
    renderThumbInner: () => <ThumbnailWithLoader thumbnail={item.image} />
  }));

  return (
    <div className="card" style={{
      width: "100%",
      boxSizing: "border-box",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ImageGallery
          items={galleryItems}
          thumbnailPosition={thumbpos}
          showThumbnails={showthumbs}
          showPlayButton={true}
          showFullscreenButton={true}
        />
      </div>

      {/* Add global style override for consistent thumbnail size */}
      <style jsx global>{`
  .image-gallery-slide img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain;
  }
  .image-gallery-thumbnail {
    width: 80px !important;
    height: 80px !important;
    gap: 5px;
    overflow: hidden;
    border: 1px solid #ddd;
  }

  .image-gallery-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* If using horizontal thumbs (bottom or top), force layout */
  .image-gallery-thumbnails-wrapper.thumbnails-bottom,
  .image-gallery-thumbnails-wrapper.thumbnails-top {
    flex-direction: row !important;
  }

  /* If using vertical thumbs (left or right), force layout */
  .image-gallery-thumbnails-wrapper.thumbnails-left,
  .image-gallery-thumbnails-wrapper.thumbnails-right {
    flex-direction: column !important;
  }
`}</style>
    </div>
  );
};

export default React.memo(ReusableCustomCarousel);
