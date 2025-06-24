// ReusableSwipeMenu.tsx
import { useState, useRef, useEffect, ReactElement } from "react";

type MenuItem = {
  label: string;
  onClick?: () => void;
};

type Props = {
  menuItems?: MenuItem[];
  main: () => ReactElement;
};

export default function ReusableSwipeMenu({ menuItems = [], main }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

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
    <div style={{ display: "flex", position: "relative", height: "100vh" }}>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        style={{
          fontSize: "24px",
          cursor: "pointer",
          padding: "10px",
          border: "none",
          background: "none",
          zIndex: 1001,
          height: "40px",
          width: "40px",
        }}
      >
        {isOpen ? "×" : "☰"}
      </button>

      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
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
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "250px",
          zIndex: 1000,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
        aria-hidden={!isOpen}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
            padding: "20px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Menu</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.map((item, idx) => (
              <li
                key={item.label + idx}
                style={{
                  display: "block",
                  padding: "10px 0",
                  color: "#333",
                  cursor: "pointer",
                }}
                onClick={() => {
                  item.onClick?.();
                  closeMenu();
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", marginLeft: "10px" }}>
        {main()}
      </main>
    </div>
  );
}
