import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  PointerEvent,
  TouchEvent,
} from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (item: OptionType) => {
    setSelected(item);
    setIsOpen(false);

    const syntheticEvent = {
      target: {
        value: item.value,
      },
    } as ChangeEvent<HTMLSelectElement>;

    event(syntheticEvent);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        width: '100%',
        fontSize: '14px',
        userSelect: 'none',
      }}
    >
      {/* Dropdown Trigger */}
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
        {selected ? selected.label : 'Sort'}
      </div>

      {/* Dropdown List */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginTop: '2px',
          maxHeight: isOpen ? '150px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.25s ease, opacity 0.25s ease',
          opacity: isOpen ? 1 : 0,
          zIndex: 10,
          boxShadow: isOpen ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelect(item)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor:
                selected?.value === item.value ? '#f0f0f0' : 'white',
              borderBottom:
                index !== data.length - 1 ? '1px solid #eee' : 'none',
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableSelect;
