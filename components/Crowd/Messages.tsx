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
  const { activeStream, streamId } = useSelector((state: any) => state.streaming);

  const videoRef = useRef(null);
  const cache = useRef(new CellMeasurerCache({ defaultHeight: 300, fixedWidth: true, fixedHeight: false }));

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const listRef = useRef(null);

  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);
  const [insertMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        if (newMessage.id === null || newMessage.Sender === null) return prev;

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

  useEffect(() => {
    if (listRef.current) {
      //listRef.current.recomputeRowHeights();
      //listRef.current.forceUpdate();
    }
  }, [posts]);

  if (!cookie) return <div>No cookie found</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = textareaRef.current?.value;
    if (message) {
      setIsLoading(true);
      try {
        await insertMessage({
          variables: { message, sender: cookie.emailAddress, live: '', video: '' },
        });
        textareaRef.current.value = '';
      } catch (err) {
        console.error('Error sending message', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      textareaRef.current?.focus();
    }
  };

  if (loading) return <CrowdLoading />;
  if (error) return <ReusableServerDown />;

  return (
    <ReusableCenterLayout
      child1={() => <></>}
      child2={() =>
        activeStream ? (
          <div className='messagesLI'>
            <video ref={videoRef} className='messageVideo' autoPlay playsInline muted />
          </div>
        ) : null
      }
      child3={() => (
        <div style={{ minHeight: '92vh', height: 'auto', width: '100%' }}>
          <ReusableMessageInput textRef={textareaRef} event={handleSubmit} loading={isLoading} />
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                rowCount={posts.length}
                ref={listRef}
                rowRenderer={({ key, index, style, parent }) => (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    columnIndex={0}
                    rowIndex={index}
                    parent={parent}
                  >
                    {({ measure }) => (
                      <div
                        style={{
                          ...style,
                          marginBottom: "15px",
                          padding: "10px 0",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%"
                        }}
                        onLoad={measure}
                      >
                        <ReusableMessage data={posts[index]} onChange={measure} />
                      </div>
                    )}
                  </CellMeasurer>
                )}
              />
            )}
          </AutoSizer>
        </div>
      )}
      child4={() => <></>}
    />
  );
};

export default Messages;
