import React from 'react';
import './Loading.css';
import Image from 'next/image';

const navItemStyle: React.CSSProperties = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100%',
  WebkitTapHighlightColor: 'transparent',
};

const circleContainerStyle: React.CSSProperties = {
  borderRadius: '100%',
  height: '45px',
  width: '45px',
  gap: '2px',
  marginBottom: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const loadingCircleStyle: React.CSSProperties = {
  borderRadius: '100%',
  height: '25px',
  width: '25px',
  boxSizing: 'border-box',
};

const Loading: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="Header" style={{ WebkitTransform: 'translate3d(0,0,0)' }}>
        <div className="HeaderRight">
          <div style={{ padding: '5px' }}>
            <div style={{ height: '40px', width: 'auto', maxWidth: '100%' }}>
              <div className="loading-screen" style={{ boxSizing: 'border-box' }}></div>
            </div>
          </div>
        </div>

        <div className="HeaderLeft">
          <div className="Navigation">
            <div
              className="HeaderNav"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                WebkitBoxPack: 'justify',
              }}
            >
              {[...Array(6)].map((_, index) => (
                <nav key={index} style={navItemStyle}>
                  <div style={circleContainerStyle}>
                    <div className="loading-screen" style={loadingCircleStyle}></div>
                  </div>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
