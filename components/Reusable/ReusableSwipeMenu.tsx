// ReusableSwipeMenu.tsx
import { useState, useRef, useEffect } from "react";

type MenuItem = {
  label: string;
  onClick?: () => void;
};

type Props = {
  menuItems?: MenuItem[];
};

export default function ReusableSwipeMenu({ menuItems = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
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

  const styles = {
    container: {
      display: "flex",
      position: "relative" as const,
      height: "100vh",
    },
    toggleButton: {
      fontSize: "24px",
      cursor: "pointer",
      padding: "10px",
      border: "none",
      background: "none",
      zIndex: 1001,
    },
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 999,
      opacity: isOpen ? 1 : 0,
      transition: "opacity 0.3s ease-in-out",
      pointerEvents: isOpen ? "auto" : "none",
    },
    sidebarContainer: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      height: "100%",
      width: "250px",
      zIndex: 1000,
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s ease-in-out",
    },
    sidebar: {
      height: "100%",
      width: "100%",
      backgroundColor: "#fff",
      boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
      padding: "20px",
    },
    menuItem: {
      display: "block",
      padding: "10px 0",
      color: "#333",
      cursor: "pointer",
    },
    mainContent: {
      flex: 1,
      padding: "20px",
      marginLeft: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Toggle Button */}
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggleMenu}
        style={styles.toggleButton}
      >
        {isOpen ? "×" : "☰"}
      </button>

      {/* Overlay */}
      <div style={styles.overlay} onClick={closeMenu} />

      {/* Sidebar Menu */}
      <nav ref={menuRef} style={styles.sidebarContainer} aria-hidden={!isOpen}>
        <div style={styles.sidebar}>
          <h2 style={{ marginBottom: "20px" }}>Menu</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.map((item, idx) => (
              <li
                key={item.label + idx}
                style={styles.menuItem}
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
      <main style={styles.mainContent}>
        <h1>Welcome to the Page</h1>
        <p>This is your main content area. You can place anything you want here.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet urna vel magna
          tristique elementum.
        </p>
      </main>
    </div>
  );
}
