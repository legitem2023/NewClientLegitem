'use client';

import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Icon } from '@iconify/react';
import 'react-image-gallery/styles/css/image-gallery.css';

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
      <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '4 / 3',
        boxSizing: "border-box"
      }}>
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loading ? 0 : 1
          }}
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
    renderThumbInner: () => <ThumbnailWithLoader thumbnail={item.image} />,
    renderItem: () => (
      <div style={{
        width: '100%',
        aspectRatio: '4 / 3',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden'
      }}>
        <img
          src={item.image}
          alt={item.Name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    )
  }));

  return (
    <div className="card" style={{
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      height: "auto",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "3px",
    }}>
      <div style={{
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ImageGallery
          items={galleryItems}
          thumbnailPosition={thumbpos}
          showThumbnails={showthumbs}
          showPlayButton={true}
          showFullscreenButton={true}
        />
      </div>

      <style jsx global>{`
        .image-gallery-thumbnail {
          aspect-ratio: 4 / 3;
        }

        .image-gallery-thumbnail img {
          width: 100%;
          object-fit: contain;
          aspect-ratio: 4 / 3;
        }
      `}</style>
    </div>
  );
};

export default React.memo(ReusableCustomCarousel);
