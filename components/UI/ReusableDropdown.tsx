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
        style={{padding: 0,
                border:'none',
                borderRadius: "9999px", // rounded-full
                backgroundColor: "#F3F4F6", // bg-gray-100
                outline: "none", // focus:outline-none
                transition: "background-color 0.2s ease-in-out", // Smooth hover effect
}}
        >
        <span className="text-xl">{Name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div  style={{position: "absolute",
                      width: "auto",
                      marginTop:'80px',
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB", // gray-200
                      padding:'3px', // rounded-md
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)", // shadow-lg
                    }}>
          <ul style={{paddingLeft:'0px'}}>
            <li style={{paddingLeft:'0px',
                        padding: "0.25rem", // p-1
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
             }} >{child1()}
            </li>
            <li style={{padding: "0.25rem", // p-1
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
              }}>{child2()}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReusableDropdown;
