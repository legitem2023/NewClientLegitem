import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import React from 'react';

const OrderLoading = () => {
  const clipPathA = 'polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)';

  const loadingBoxStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    clipPath: clipPathA,
    borderRadius: '3px',
    padding: '8px 17px',
  };

  const containerStyle: React.CSSProperties = {
    height: '40px',
    gap: '2px',
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 14%)',
    marginTop: '5px',
    marginBottom: '5px',
    boxShadow: '0.5px 0.5px 3px #000000',
  };

  const rowStyle: React.CSSProperties = {
    height: '45px',
    gap: '2px',
    marginTop: '5px',
    marginBottom: '5px',
    boxShadow: '0.5px 0.5px 3px #000000',
  };

  return (
    <ReusableCenterLayout
      child1={() => (
        <div style={{ padding: '2px' }}>
          <div style={containerStyle}>
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="loading-screen" style={loadingBoxStyle}></div>
            ))}
          </div>
        </div>
      )}
      child2={() => (
        <div style={{ padding: '2px' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} style={rowStyle}>
              <div className="loading-screen" style={{ boxSizing: 'border-box' }}></div>
            </div>
          ))}
        </div>
      )}
      child3={() => <div style={{ padding: '2px' }}></div>}
      child4={() => <></>}
    />
  );
};

export default OrderLoading;
