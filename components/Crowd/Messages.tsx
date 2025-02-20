'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MESSAGES } from 'graphql/queries';
import { MESSAGE_ADDED } from 'graphql/subscriptions';
import { SEND_MESSAGE } from 'graphql/mutation';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import ReusableMessage from 'components/UI/ReusableMessage';
import { useSelector } from 'react-redux';
import ReusableMessageInput from 'components/UI/ReusableMessageInput';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import CrowdLoading from './CrowdLoading';
import ReusableServerDown from 'components/UI/ReusableServerDown';

const Messages = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const { activeStream } = useSelector((state: any) => state.streaming);

  const videoRef = useRef(null);
  const cache = useRef(new CellMeasurerCache({ 
    defaultHeight: 100, // More conservative default height
    fixedWidth: true, 
    fixedHeight: false 
  }));

  const [posts, setPosts] = useState([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const textareaRef = useRef(null);
  const listRef = useRef(null);

  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    onCompleted: () => {
      setIsListLoading(false);
      // Reset cache when initial data loads
      cache.current.clearAll();
    },
  });

  const [insertMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        if (!newMessage?.id) return prev;

        // Clear cache when new messages arrive
        cache.current.clearAll();
        
        return {
          ...prev,
          messages: prev.messages ? [newMessage, ...prev.messages] : [newMessage],
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  useEffect(() => {
    if (data) {
      setPosts(data.messages || []);
      // Reset list measurements when data changes
      listRef.current?.recomputeRowHeights();
    }
    if (videoRef.current && activeStream) videoRef.current.srcObject = activeStream;
  }, [data, activeStream]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = textareaRef.current?.value;
    if (message) {
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
    }
  };

  if (!cookie) return <div>No cookie found</div>;
  if (loading) return <CrowdLoading />;
  if (error) return <ReusableServerDown />;

  return (
    <ReusableCenterLayout
      child1={() =><></>}
      child2={() => activeStream && (
        <div className="messagesLI">
          <video ref={videoRef} className="messageVideo" autoPlay playsInline muted />
        </div>
      )}
      child3={() => (
        <div style={{ height: '92vh', width: '100%' }}> {/* Fixed height container */}
          <ReusableMessageInput textRef={textareaRef} event={handleSubmit} loading={isMessageLoading} />
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                deferredMeasurementCache={cache.current}
                rowHeight={cache.current.rowHeight}
                rowCount={posts.length}
                rowKey={({ index }) => posts[index]?.id || index} // Stable row keys
                ref={listRef}
                rowRenderer={({ key, index, style, parent }) => {
                  const message = posts[index];
                  return (
                    <CellMeasurer
                      key={message?.id || key} // Use message ID for cache identity
                      cache={cache.current}
                      columnIndex={0}
                      rowIndex={index}
                      parent={parent}
                    >
                      {({ measure }) => (
                        <div
                          style={{ ...style, padding: '10px 0' }}
                          onLoad={measure}
                        >
                          <ReusableMessage 
                            data={message} 
                            onContentResize={measure} // Trigger measure on content changes
                          />
                        </div>
                      )}
                    </CellMeasurer>
                  );
                }}
              />
            )}
          </AutoSizer>
        </div>
      )}
      child4={() =><></>}
    />
  );
};

export default Messages;
