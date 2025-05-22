import React, { useRef, useEffect, useState } from 'react';

type PropsElement = {
  Label: string;
  value: any;
};

const Element_Title: React.FC<PropsElement> = ({ Label, value }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const spanWidth = spanRef.current?.scrollWidth || 0;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    setShouldAnimate(spanWidth > containerWidth);
  }, [value]);

  const marqueeStyle: React.CSSProperties = shouldAnimate
    ? {
        display: 'inline-block',
        animation: 'marqueeLoop 8s linear infinite',
      }
    : {};

  const keyframes = `
    @keyframes marqueeLoop {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    <div className="UniversalLabels"  style={{overflow:'hidden'}} ref={containerRef}>
      <style>{keyframes}</style>
      <span className="thumbElements_Title" ref={spanRef} style={marqueeStyle}>
        {value}
      </span>
    </div>
  );
};

export default Element_Title;