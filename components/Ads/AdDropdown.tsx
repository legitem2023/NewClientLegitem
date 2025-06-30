import { useState } from 'react';

export default function AdDropdown({ content }) {
  const [isOpen, setIsOpen] = useState(false);
 

  

  return (
    <div style={{
    width: '14rem',
    fontFamily: 'sans-serif',
  }}>
      <button style={{
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'left',
    border: '2px solid gray',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottom: isOpen ? 'none' : '2px solid gray',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  }} onClick={() => setIsOpen(!isOpen)}>
        Advertisement
        <span style={{transition: 'transform 0.3s ease' transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>▼</span>
      </button>
      {isOpen && <div style={{
    borderLeft: '2px solid gray',
    borderRight: '2px solid gray',
    borderBottom: '2px solid gray',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    backgroundColor: '#f9f9f9',
    padding: '12px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  }}>{content}</div>}
    </div>
  );
}
