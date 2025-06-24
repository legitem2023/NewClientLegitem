// ReusableSwipeMenu.tsx
import { useState, useRef, useEffect } from "react";

type MenuItem = {
  label: string;
};

type Props = {
  menuItems?: MenuItem[];
};

export default function ReusableSwipeMenu({ menuItems = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row" as const,
    },
    mainContent: {
      flex: 1,
      padding: "20px",
      marginLeft: "10px",
    },
    menuButton: {
      padding: "10px",
      fontSize: "16px",
      cursor: "pointer",
      background: "none",
      border: "1px solid #ccc",
      margin: "10px",
    },
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 999,
    },
    sidebarContainer: {
      position: "fixed" as const,
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
      position: "relative" as const,
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "20px",
      position: "absolute" as const,
      top: "10px",
      right: "10px",
      cursor: "pointer",
    },
    menuItem: {
      display: "block",
      padding: "10px 0",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <button onClick={toggleMenu} style={styles.menuButton}>
        ☰ Open Menu
      </button>

      {isOpen && <div style={styles.overlay} onClick={() => setIsOpen(false)} />}

      <div ref={menuRef} style={styles.sidebarContainer}>
        <div style={styles.sidebar}>
          <button onClick={toggleMenu} style={styles.closeButton}>
            ×
          </button>
          <h2 style={{ marginBottom: "20px" }}>Menu</h2>
          {menuItems.map((item, idx) => (
            <span key={idx} style={styles.menuItem}>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.mainContent}>
        <h1>Welcome to the Page</h1>
        <p>This is your main content area. You can place anything you want here.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet urna vel magna tristique elementum.</p>
      </div>
    </div>
  );
}
