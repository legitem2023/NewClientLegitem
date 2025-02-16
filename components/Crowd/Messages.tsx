"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "graphql/queries";
import { MESSAGE_ADDED } from "graphql/subscriptions";
import { SEND_MESSAGE } from "graphql/mutation";
import ReusableCenterLayout from "components/Layout/ReusableCenterLayout";
import ReusableMessage from "components/UI/ReusableMessage";
import { useSelector } from "react-redux";
import ReusableMessageInput from "components/UI/ReusableMessageInput";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import CrowdLoading from "./CrowdLoading";
import ReusableServerDown from "components/UI/ReusableServerDown";

const Messages = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const { activeStream } = useSelector((state: any) => state.streaming);

  const videoRef = useRef(null);
  const cache = useRef(new CellMeasurerCache({ defaultHeight: 300, fixedWidth: true, fixedHeight: false }));

  const [allMessages, setAllMessages] = useState<string[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef(null);
  const textareaRef = useRef(null);

  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    onCompleted: () => setIsListLoading(false),
  });

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
    if (data) {
      const multipliedData = multiplyArray(data.messages || [], 30000);
      setAllMessages(multipliedData);
      setVisibleMessages(multipliedData.slice(0, 100)); // Load first batch
      setIsListLoading(false);
    }
    if (videoRef.current && activeStream) videoRef.current.srcObject = activeStream;
  }, [data, activeStream]);

  const loadMoreMessages = useCallback(() => {
    setTimeout(() => {
      setVisibleMessages((prev) => [
        ...prev,
        ...allMessages.slice(prev.length, prev.length + 100), // Load next 100 messages
      ]);
    }, 500);
  }, [allMessages]);

  const observeLastMessage = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Loading more messages...");
          loadMoreMessages();
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(node);
  }, [loadMoreMessages]);

  if (!cookie) return <div>No cookie found</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = textareaRef.current?.value;
    if (message) {
      setIsMessageLoading(true);
      try {
        await insertMessage({
          variables: { message, sender: cookie.emailAddress, live: "", video: "" },
        });
        textareaRef.current.value = "";
      } catch (err) {
        console.error("Error sending message", err);
      } finally {
        setIsMessageLoading(false);
      }
    } else {
      textareaRef.current?.focus();
    }
  };

  if (loading) return <CrowdLoading />;
  if (error) return <ReusableServerDown />;

  function multiplyArray(data, times) {
    return Array(times).fill(data).flat();
  }

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
        <div style={{ minHeight: "92vh", height: "auto", width: "100%" }}>
          <ReusableMessageInput textRef={textareaRef} event={handleSubmit} loading={isMessageLoading} />
          <AutoSizer>
            {({ height, width }) =>
              isListLoading ? (
                <CrowdLoading />
              ) : (
                <List
                  height={height}
                  width={width}
                  rowHeight={cache.current.rowHeight}
                  deferredMeasurementCache={cache.current}
                  rowCount={visibleMessages.length}
                  ref={listRef}
                  rowRenderer={({ key, index, style, parent }) => {
                    const isLastItem = index === visibleMessages.length - 1;

                    return (
                      <CellMeasurer key={key} cache={cache.current} columnIndex={0} rowIndex={index} parent={parent}>
                        {({ measure }) => (
                          <div
                            ref={isLastItem ? observeLastMessage : null}
                            style={{
                              ...style,
                              marginBottom: "15px",
                              padding: "10px 0",
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                              scrollSnapType: "both mandatory",
                            }}
                            onLoad={measure}
                          >
                            {isListLoading ? (
                              <div className="skeleton-loader" style={{ height: "50px", background: "#f0f0f0" }} />
                            ) : (
                              <ReusableMessage data={visibleMessages[index]} onChange={measure} />
                            )}
                          </div>
                        )}
                      </CellMeasurer>
                    );
                  }}
                />
              )
            }
          </AutoSizer>
        </div>
      )}
      child4={() => <></>}
    />
  );
};

export default Messages;
