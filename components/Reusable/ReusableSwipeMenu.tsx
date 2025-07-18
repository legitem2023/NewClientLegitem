// ReusableSwipeMenu.tsx
import { useState, useRef, useEffect, ReactElement } from "react";

type MenuItem = {
  label: string;
  onClick?: () => void;
};

type Props = {
  menuItems?: MenuItem[];
  menu: () => ReactElement;
  main: () => ReactElement;
};

export default function ReusableSwipeMenu({ menuItems = [],menu ,main }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
console.log(isOpen);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div style={{ display: "flex", position: "relative", minHeight: "100vh", width: "100%",textAlign:'left' }}>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        style={{
          fontSize: "25px",
          cursor: "pointer",
          background: "none",
          zIndex: 1001,
          height: "50px",
          width: "50px",
          border:'none',
          aspectRatio:"1 / 1",
          position:'absolute'
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? "x" : "☰"}
      </button>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={closeMenu}
      />

      {/* Sidebar Menu */}
      <nav
        ref={menuRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "300px",
          zIndex: 1000,
          transform: isOpen ? "translateX(0) scaleX(1)" : "translateX(-100%) scaleX(0)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
          boxSizing: "border-box",
          padding:"0px",
          paddingTop: "50px",
        }}
        aria-hidden={!isOpen}> 
        {menu()}
      </nav>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          minHeight: "100vh",
          paddingTop: "50px",
          width: "100%",
          margin:"0",
          position:"relative"
        }}
      >
        {main()}
      </main>
    </div>
  );
}
