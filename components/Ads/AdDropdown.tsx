import { useState, ReactNode } from 'react';

interface AdDropdownProps {
  content: ReactNode;
}

export default function AdDropdown({ content }: AdDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'sans-serif',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '2px',
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'left',
    border: '1px solid gray',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottom: isOpen ? 'none' : '2px solid gray',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const iconStyle: React.CSSProperties = {
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const contentStyle: React.CSSProperties = {
    borderLeft: '2px solid gray',
    borderRight: '2px solid gray',
    borderBottom: '2px solid gray',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#f9f9f9',
    padding: '12px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={() => setIsOpen(!isOpen)}>
        Advertisement
        <span style={iconStyle}>▼</span>
      </button>
      {isOpen && <div style={contentStyle}>{content}</div>}
    </div>
  );
}
