'use client';

import { useState } from 'react';

export default function ReusableSwipeMenu() {
  const [open, setOpen] = useState(false);

  const drawerStyle = {
    position: 'fixed',
    top: 0,
    left: open ? '0' : '-260px',
    width: '250px',
    height: '100%',
    backgroundColor: '#111',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0 6px rgba(0,0,0,0.4)',
    transition: 'left 0.3s ease-in-out',
    zIndex: 1000,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    opacity: open ? 1 : 0,
    visibility: open ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 999,
  };

  const toggleButtonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1100,
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <>
      <button onClick={() => setOpen(true)} style={toggleButtonStyle}>
        ☰ Open Menu
      </button>

      {/* Overlay */}
      <div onClick={() => setOpen(false)} style={overlayStyle} />

      {/* Drawer Menu */}
      <div style={drawerStyle}>
        <h2 style={{ marginTop: 0 }}>Menu</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px', cursor: 'pointer' }}>Home</li>
          <li style={{ marginBottom: '15px', cursor: 'pointer' }}>About</li>
          <li style={{ marginBottom: '15px', cursor: 'pointer' }}>Services</li>
          <li style={{ marginBottom: '15px', cursor: 'pointer' }}>Contact</li>
        </ul>
      </div>
    </>
  );
}
