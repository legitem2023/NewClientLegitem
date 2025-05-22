import React, { useRef, useEffect, useState } from 'react'

type PropsElement = {
  Label: string,
  value: any,
}

const Element_Title: React.FC<PropsElement> = ({ Label, value }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const textWidth = textRef.current?.scrollWidth || 0;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    setShouldAnimate(textWidth > containerWidth);
  }, [value]);

  const containerStyle: React.CSSProperties = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
  };

  const textStyle: React.CSSProperties = shouldAnimate
    ? {
        display: 'inline-block',
        paddingLeft: '100%',
        animation: 'marquee 10s linear infinite',
      }
    : {};

  const keyframes = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    <div className="UniversalLabels" ref={containerRef} style={containerStyle}>
      <style>{keyframes}</style>
      <span className='thumbElements_Title' ref={textRef} style={textStyle}>
        {value}
      </span>
    </div>
  );
};

export default Element_Title;