import React, { useEffect, useState } from 'react';

interface CanvasTextImageProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  padding?: number;
}

const CanvasTextImage: React.FC<CanvasTextImageProps> = ({
  text,
  fontSize = 80,
  fontFamily = 'Cambria',
  padding = 20,
}) => {
  const [imageData, setImageData] = useState<string>('');

  useEffect(() => {
    const canvasWidth = 800;
    const canvasHeight = 200;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = 'black';
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';

    const words = text.split(' ');
    const lineHeight = fontSize * 1.5;
    const maxLineWidth = canvasWidth - padding * 2;

    let line = '';
    let y = padding;

    const lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxLineWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].trim(), canvasWidth / 2, y + i * lineHeight);
    }

    setImageData(canvas.toDataURL('image/png'));
  }, [text, fontSize, fontFamily, padding]);

  return <div>{imageData && <img src={imageData} alt="Canvas Output" />}</div>;
};

export default CanvasTextImage;
