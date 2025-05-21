import React, { useEffect, useState } from 'react';

interface CanvasTextImageProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  padding?: number;
}

const CanvasTextImage: React.FC<CanvasTextImageProps> = ({
  text,
  fontSize = 24,
  fontFamily = 'Arial',
  padding = 20,
}) => {
  const [imageData, setImageData] = useState<string>('');

  useEffect(() => {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    ctx.font = `${fontSize}px ${fontFamily}`;

    const words = text.split(' ');
    const lineHeight = fontSize * 1.5;
    let lines: string[] = [];
    let line = '';
    let maxLineWidth = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = ctx.measureText(testLine).width;

      // Optional: you could use a maxWidth here if needed
      if (testWidth > 1000 && line !== '') {
        lines.push(line);
        maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }

    if (line) {
      lines.push(line);
      maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
    }

    const canvasWidth = '800';//Math.ceil(maxLineWidth + padding * 2);
    const canvasHeight = '200';//Math.ceil(lines.length * lineHeight + padding * 2);

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const finalCtx = canvas.getContext('2d');
    if (!finalCtx) return;

    finalCtx.fillStyle = 'white';
    finalCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    finalCtx.fillStyle = 'black';
    finalCtx.font = `${fontSize}px ${fontFamily}`;
    finalCtx.textBaseline = 'top';

    lines.forEach((l, index) => {
      finalCtx.fillText(l, padding, padding + index * lineHeight);
    });

    setImageData(canvas.toDataURL('image/png'));
  }, [text, fontSize, fontFamily, padding]);

  return <div>{imageData && <img src={imageData} alt="Canvas Output" />}</div>;
};

export default CanvasTextImage;
