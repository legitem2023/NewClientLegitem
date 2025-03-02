import React, { useState, useRef, useEffect, useCallback } from 'react';

type DropdownProps = {
  options: string[];
  text: string;
  onSelect: (selected: string) => void;
  children?: React.ReactNode; // Allows custom button content
};

const ReusableDropdown: React.FC<DropdownProps> = ({ options, text, onSelect, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(text);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside dropdown
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Handle selection
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-60" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm w-full text-left bg-white shadow-sm flex justify-between items-center p-2 border rounded"
      >
        {children || selectedOption} {/* Allows custom button content */}
        <span className="text-gray-500">&#9662;</span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="text-sm p-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReusableDropdown;
