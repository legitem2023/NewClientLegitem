import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import React from 'react';

const LoadingBox = ({ height = '30px', width = '100%', borderRadius }: { height?: string, width?: string, borderRadius?: string }) => (
  <div
    className="loading-screen"
    style={{
      boxSizing: 'border-box',
      height,
      width,
      borderRadius,
    }}
  />
);

const MessageSkeleton = ({ imgSize = '40px', marginBottom = '25px' }) => (
  <div className="messagesLI" style={{ marginBottom }}>
    <div>
      <div className="messageSender">
        <div className="messageSenderImgcont">
          <LoadingBox height={imgSize} width={imgSize} borderRadius="100%" />
        </div>
        <LoadingBox />
        <LoadingBox />
      </div>
      <div className="messageBody">
        <LoadingBox height="200px" />
      </div>
      <div className="messageReactions">
        <LoadingBox />
        <LoadingBox />
        <LoadingBox />
      </div>
    </div>
  </div>
);

const CrowdLoading = () => {
  return (
    <ReusableCenterLayout
      child1={() => <></>}
      child2={() => (
        <div style={{ display: 'flex', flexDirection: 'column' }} className="Messenger_inputs">
          <div className="Messenger_inputs_fdiv">
            <LoadingBox height="40px" />
          </div>
        </div>
      )}
      child3={() => (
        <div className="messagesUL" style={{ boxShadow: '0.5px 0.5px 3px #c0c0c0' }}>
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      )}
      child4={() => <></>}
    />
  );
};

export default CrowdLoading;
