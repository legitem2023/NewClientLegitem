import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const cache = useRef(new CellMeasurerCache({ defaultHeight: 60, fixedWidth: true, fixedHeight: false }));
  const listRef = useRef<List>(null);
  const postsRef = useRef<any[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    onCompleted: () => listRef.current?.recomputeRowHeights(),
  });

  const [insertMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        if (newMessage.id === null || newMessage.Sender === null) return prev;

        postsRef.current = [newMessage, ...postsRef.current];
        listRef.current?.recomputeRowHeights();
        return prev;
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  const messages = useMemo(() => data?.messages || [], [data]);

  const handleSubmit = async (e: React.FormEvent) => {
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
    } else {
      textareaRef.current?.focus();
    }
  };

  if (!cookie) return <div>No cookie found</div>;
  if (loading) return <CrowdLoading />;
  if (error) return <ReusableServerDown />;

  function multiplyArray(data: any[], times: number) {
    return Array(times).fill(data).flat();
  }

  const result = multiplyArray(messages, 30000);

  const rowRenderer = useCallback(
    ({ key, index, style, parent }) => (
      <CellMeasurer key={key} cache={cache.current} columnIndex={0} rowIndex={index} parent={parent}>
        {({ measure }) => (
          <div
            style={{
              ...style,
              marginBottom: '15px',
              padding: '10px 0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              scrollSnapType: 'both mandatory',
            }}
            onLoad={() => setTimeout(measure, 50)} // Debounce measurement
          >
            <ReusableMessage data={result[index]} />
          </div>
        )}
      </CellMeasurer>
    ),
    [result]
  );

  return (
    <ReusableCenterLayout
      child1={() => <></>}
      child2={() =>
        activeStream ? (
          <div className="messagesLI">
            <video ref={videoRef} className="messageVideo" autoPlay playsInline muted />
          </div>
        ) : null
      }
      child3={() => (
        <div style={{ minHeight: '92vh', height: 'auto', width: '100%' }}>
          <ReusableMessageInput textRef={textareaRef} event={handleSubmit} loading={isMessageLoading} />
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                rowCount={result.length}
                overscanRowCount={3}
                ref={listRef}
                rowRenderer={rowRenderer}
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
