import React from "react";

const ReusableList = ({ items, renderItem, onItemClick, className }) => {
  return (
    <ul className={`reusable-list ${className}`}>
      {items.map((item, index) => (
        <li
          key={index}
          className="reusable-list-item"
          onClick={() => onItemClick && onItemClick(item, index)}
        >
          {renderItem ? renderItem(item, index) : item}
        </li>
      ))}
    </ul>
  );
};

export default ReusableList;
