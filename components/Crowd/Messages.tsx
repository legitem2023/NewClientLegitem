'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery, useMutation,useSubscription } from '@apollo/client';
import { GET_MESSAGES } from 'graphql/queries';
import { MESSAGE_ADDED } from 'graphql/subscriptions';
import { SEND_MESSAGE } from 'graphql/mutation';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import ReusableMessage from 'components/UI/ReusableMessage';
import { useSelector } from 'react-redux';
import ReusableMessageInput from 'components/UI/ReusableMessageInput';
import CrowdLoading from './CrowdLoading';
import ReusableServerDown from 'components/UI/ReusableServerDown';

const Messages = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const { activeStream } = useSelector((state: any) => state.streaming);

  const videoRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const textareaRef = useRef(null);
  const [isListLoading, setIsListLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);
 // const ddd  = useSubscription(MESSAGE_ADDED);
 // console.log(ddd);
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    onCompleted: () => setIsListLoading(false),
  });

  const [insertMessage] = useMutation(SEND_MESSAGE);

  // subscribeToMore should be inside useEffect to ensure it's called only once
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        if(newMessage.id === null) return;
        return {
          ...prev,
          messages: prev.messages ? [newMessage, ...prev.messages] : [newMessage],
        };
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  useEffect(() => {
    if (data) setPosts(data.messages || []);
    if (videoRef.current && activeStream) videoRef.current.srcObject = activeStream;
  }, [data, activeStream]);

const handleSubmit = async (e) => {
  e.preventDefault(); 
  const message = textareaRef.current?.value.trim(); // Trim whitespace 
  if (!message) {
   // alert('Message cannot be empty.');
    return;
  }

  if (message.length < 2) {
   // alert('Message must be at least 2 characters long.');
    return;
  }

  if (message.length > 500) {
    //alert('Message cannot exceed 500 characters.');
    return;
  }

  setIsMessageLoading(true);
  try {
    await insertMessage({
      variables: { message, sender: cookie.emailAddress, live: '', video: '' },
    });
    textareaRef.current.value = '';
  } catch (err) {
    console.error('Error sending message', err);
  } finally {
    setIsMessageLoading(false);
  }
};

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 20, posts.length));
  };

  if (!cookie) return <div>No cookie found</div>;
  if (loading) return <CrowdLoading />;
  if (error) return <ReusableServerDown />;

  const MemoizedMessage = React.memo(ReusableMessage);

// Usage in list

  return (
    <ReusableCenterLayout
      child1={() => <></>}
      child2={() => activeStream && (
        <div className="messagesLI">
          <video ref={videoRef} className="messageVideo" autoPlay playsInline muted />
        </div>
      )}
      child3={() => (
        <div style={{ minHeight:'90vh',height: 'auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ReusableMessageInput textRef={textareaRef} event={handleSubmit} loading={isMessageLoading} />
          <div ref={containerRef} style={{ flex: 1, height: 'auto',marginBottom:'5px' }}>
            {posts.slice(0, visibleItems).map((message) => (
             /* <ReusableMessage key={message.id} data={message} />*/
              <ReusableMessage key={message.id}data={message} />
            ))}
            {visibleItems < posts.length && (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <button 
                  onClick={loadMore}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      child4={() => <></>}
    />
  );
};

export default Messages;
