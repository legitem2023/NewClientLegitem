import Image from "next/image";
import React, { useEffect, useState } from "react";

type FirstLetterImageProps = {
  text: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
};

const ReusableFirstLetterImage: React.FC<FirstLetterImageProps> = ({
  text,
  size = 100,
  bgColor = "rgb(87, 39, 0)",
  textColor = "#ffffff",
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [useFletter,setFletter] = useState<string>("")
  useEffect(() => {
    if (text) {
      if(text===null || text ===""){
        setFletter("Guess")
      }else{
        setFletter(text)
      }
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Set canvas size
        canvas.width = size;
        canvas.height = size;

        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);

        // Draw text
        ctx.fillStyle = textColor;
        
        ctx.font = `${size / 2}px Arial`;
        
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text.charAt(0).toUpperCase(), size / 2, size / 2);

        // Convert canvas to image URL
        setImageUrl(canvas.toDataURL());
      }
    }
  }, [text, size, bgColor, textColor]);

  return imageUrl ? <Image src={imageUrl} alt={useFletter.charAt(0)} width={35} height={35} />: null;
};

export default ReusableFirstLetterImage;
