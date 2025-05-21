import React, { useEffect, useState } from 'react';

interface CanvasTextImageProps {
  text: string;
  width?: number; // Optional custom width
  fontSize?: number; // Optional font size
  fontFamily?: string; // Optional font family
}

const CanvasTextImage: React.FC<CanvasTextImageProps> = ({
  text,
  width = 800,
  fontSize = 24,
  fontFamily = 'Arial',
}) => {
  const [imageData, setImageData] = useState<string>('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const height = (width * 3) / 4;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';

    const lineHeight = fontSize * 1.5;
    const words = text.split(' ');
    let line = '';
    let y = 20;
    const maxWidth = canvas.width - 40;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 20, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 20, y);

    const dataURL = canvas.toDataURL('image/png');
    setImageData(dataURL);
  }, [text, width, fontSize, fontFamily]);

  return (
    <div>
      {imageData && <img src={imageData} alt="Canvas Output" />}
    </div>
  );
};

export default CanvasTextImage;
