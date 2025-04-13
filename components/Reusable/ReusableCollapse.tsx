
import React,{ useRef,useCallback,useEffect,useState,ReactNode,ReactElement,FC} from "react";
import { Icon } from '@iconify/react'
type ReusableCollapseProps = {
  NameIcon:()=>ReactElement,
  child1:() => ReactElement,
};

const ReusableCollapse:React.FC<ReusableCollapseProps> = ({NameIcon,child1}) => {
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
    <div ref={dropdownRef} style={{display:'flex',position:"relative",flexDirection:'column',alignItems:'flex-end',borderRadius:"50px",padding:'0px'}} >
      {/* Three Dots Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{padding: 0,
                border:'none',
                borderRadius: "50px", // rounded-full
                backgroundColor: "transparent", // bg-gray-100
                outline: "none", // focus:outline-none
                transition: "background-color 0.2s ease-in-out", // Smooth hover effect
}}
        >
        {NameIcon()}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div  style={{position: "absolute",
                      width: "auto", 
                      left:"0px",
                      backgroundColor: "transparent",
                      borderRadius:'50px',
                    }}>
          <div style={{paddingLeft:'0px',padding:'0px',borderRadius:'50px'}}>
            {child1()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableCollapse;
