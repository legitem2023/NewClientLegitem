import React from "react";

interface LimitedTextProps {
  text: string;
}

const LimitedText: React.FC<LimitedTextProps> = ({ text }) => {
  return (
    <p
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
    </p>
  );
};

export default LimitedText;
