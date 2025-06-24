// SlideMenu.jsx
import { useState, useRef, useEffect } from "react";

export default function ReusableSwipeMenu({ menuItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const styles = {
    menuButton: {
      padding: "10px",
      fontSize: "16px",
      cursor: "pointer",
      background: "none",
      border: "1px solid #ccc",
      margin: "10px",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 999,
    },
    sidebarContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      width: "250px",
      zIndex: 1000,
      transition: "transform 0.3s ease-in-out",
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    },
    sidebar: {
      height: "100%",
      width: "100%",
      backgroundColor: "#fff",
      boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
      padding: "20px",
      position: "relative",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "20px",
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
    },
    menuItem: {
      display: "block",
      padding: "10px 0",
      color: "#333",
      textDecoration: "none",
    },
  };

  return (
    <>
      <button onClick={toggleMenu} style={styles.menuButton}>
        ☰ Open Menu
      </button>

      {/* Sidebar and overlay rendered conditionally */}
      {isOpen && <div style={styles.overlay} onClick={() => setIsOpen(false)} />}

      <div ref={menuRef} style={styles.sidebarContainer}>
        <div style={styles.sidebar}>
          <button onClick={toggleMenu} style={styles.closeButton}>
            ×
          </button>
          <h2 style={{ marginBottom: "20px" }}>Menu</h2>
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              style={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
