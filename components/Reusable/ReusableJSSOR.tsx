'use client';

import { useEffect, useRef } from 'react';

const slides = [
  { image: "https://via.placeholder.com/600x400?text=1", thumb: "https://via.placeholder.com/100?text=1" },
  { image: "https://via.placeholder.com/600x400?text=2", thumb: "https://via.placeholder.com/100?text=2" },
  { image: "https://via.placeholder.com/600x400?text=3", thumb: "https://via.placeholder.com/100?text=3" },
  { image: "https://via.placeholder.com/600x400?text=4", thumb: "https://via.placeholder.com/100?text=4" },
];

export default function ReusableJSSOR {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadJssor = async () => {
      if (typeof window !== 'undefined' && !window.$JssorSlider$) {
        await import('https://cdn.jsdelivr.net/npm/jssor-slider@28.0.0/dist/min/jssor.slider.min.js');
      }

      const jssor_slider = new window.$JssorSlider$('jssor_1', {
        $AutoPlay: 1,
        $ArrowNavigatorOptions: { $Class: window.$JssorArrowNavigator$ },
        $ThumbnailNavigatorOptions: {
          $Class: window.$JssorThumbnailNavigator$,
          $Cols: 2,
          $Align: 0,
          $NoDrag: true,
        },
      });

      function ScaleSlider() {
        const containerWidth = sliderRef.current?.parentElement?.clientWidth || 800;
        jssor_slider.$ScaleWidth(Math.min(containerWidth, 800));
      }

      ScaleSlider();
      window.addEventListener('resize', ScaleSlider);
      return () => window.removeEventListener('resize', ScaleSlider);
    };

    loadJssor();
  }, []);

  return (
    <div id="jssor_1" ref={sliderRef} style={{ position: 'relative', width: '800px', height: '400px', overflow: 'hidden' }}>
      {/* Thumbnails */}
      <div data-u="thumbnavigator" className="jssor-thumbnail" style={{ position: 'absolute', left: 0, top: 0, width: '200px', height: '400px', overflow: 'auto' }}>
        <div data-u="slides">
          <div data-u="prototype" className="p" style={{ width: '100px', height: '100px' }}>
            <div data-u="thumbnailtemplate" className="t" />
          </div>
        </div>
      </div>

      {/* Slides */}
      <div data-u="slides" style={{ cursor: 'default', position: 'absolute', left: '200px', top: 0, width: '600px', height: '400px', overflow: 'hidden' }}>
        {slides.map((s, i) => (
          <div key={i}>
            <img data-u="image" src={s.image} />
            <img data-u="thumb" src={s.thumb} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div data-u="arrowleft" style={{ width: '55px', height: '55px', top: '162px', left: '220px', position: 'absolute' }}></div>
      <div data-u="arrowright" style={{ width: '55px', height: '55px', top: '162px', right: '20px', position: 'absolute' }}></div>

      <style jsx>{`
        .jssor-thumbnail .p {
          float: left;
          width: 100px;
          height: 100px;
          margin: 5px;
        }
        .jssor-thumbnail .t {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
}
