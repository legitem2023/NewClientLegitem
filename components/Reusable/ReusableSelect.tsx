import React, { ChangeEvent, PointerEvent, TouchEvent } from 'react';

type OptionType = {
  value: string | number;
  label: string;
};

type ReusableSelectProps = {
  data: OptionType[];
  event: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const ReusableSelect: React.FC<ReusableSelectProps> = ({ data, event }) => {
  const stopEventPropagation = (
    e: TouchEvent<HTMLSelectElement> | PointerEvent<HTMLSelectElement>
  ) => {
    e.stopPropagation();
  };

  return (
    <select
      onChange={event}
      onTouchStart={stopEventPropagation}
      onTouchMove={stopEventPropagation}
      onTouchEnd={stopEventPropagation}
      onPointerDown={stopEventPropagation}
      onPointerMove={stopEventPropagation}
      onPointerUp={stopEventPropagation}
      style={{
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid transparent',
        backgroundColor: 'white',
        width:'100%',
        fontSize: '14px',
      }}
    >
      {data.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default ReusableSelect;
