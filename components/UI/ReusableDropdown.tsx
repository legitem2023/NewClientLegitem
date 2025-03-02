import React,{ useRef,useCallback,useEffect,useState,ReactNode,ReactElement,FC} from "react";

type ReusableDropdownProps = {
  Name:string,
  child1:() => ReactElement,
  child2:() => ReactElement,
};

const ReusableDropdown:FC<ReusableDropdownProps> = ({child1,child2,Name}) => {
  const [isOpen, setIsOpen] = useState(false);
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
  
  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Three Dots Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-0 rounded-full w-[30px] border h-[30px] bg-gray-100 hover:bg-gray-200 focus:outline-none">
        <span className="text-xl">{Name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 w-[auto] bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            <li className="p-1 flex flex-col items-center justify-center">
              {child1()}
            </li>
            <li className="p-1 flex flex-col items-center justify-center">
              {child2()}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReusableDropdown;
