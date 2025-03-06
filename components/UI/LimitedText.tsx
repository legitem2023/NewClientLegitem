import React from "react";

interface LimitedTextProps {
  text: string;
}

const LimitedText: React.FC<LimitedTextProps> = ({ text }) => {
  return (
    <div
      style={{
        fontSize: "15px",
        color: "gray",
        padding: "1px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text.slice(0, 20)}
    </div>
  );
};

export default LimitedText;
