import React, { useState, ChangeEvent, PointerEvent, TouchEvent } from 'react';

type OptionType = {
  value: string | number;
  label: string;
};

type ReusableSelectProps = {
  data: OptionType[];
  event: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const ReusableSelect: React.FC<ReusableSelectProps> = ({ data, event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: OptionType) => {
    setSelected(item);
    setIsOpen(false);

    // Create a synthetic ChangeEvent to match the original signature
    const syntheticEvent = {
      target: {
        value: item.value,
      },
    } as ChangeEvent<HTMLSelectElement>;

    event(syntheticEvent);
  };

  const stopEventPropagation = (
    e: TouchEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
  };

  return (
    <div
      onTouchStart={stopEventPropagation}
      onTouchMove={stopEventPropagation}
      onTouchEnd={stopEventPropagation}
      onPointerDown={stopEventPropagation}
      onPointerMove={stopEventPropagation}
      onPointerUp={stopEventPropagation}
      style={{
        position: 'relative',
        width: '100%',
        fontSize: '14px',
      }}
    >
      <div
        onClick={toggleDropdown}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        {selected ? selected.label : 'Select an option'}
      </div>
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginTop: '4px',
            maxHeight: '150px',
            overflowY: 'auto',
            zIndex: 10,
          }}
        >
          {data.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor:
                  selected?.value === item.value ? '#f0f0f0' : 'white',
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReusableSelect;
