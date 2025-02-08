'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MESSAGES } from 'graphql/queries';
import { MESSAGE_ADDED } from 'graphql/subscriptions';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { SEND_MESSAGE } from 'graphql/mutation';
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout';
import ReusableMessage from 'components/UI/ReusableMessage';
import { useSelector } from 'react-redux';
import ReusableMessageInput from 'components/UI/ReusableMessageInput';
import { VariableSizeList } from 'react-window';
import ProductLoading from 'components/Products/ProductLoading';
import CrowdLoading from './CrowdLoading';
import ReusableServerDown from 'components/UI/ReusableServerDown';

const Messages = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const streaming = useSelector((state: any) => state.streaming.streaming);
  const [currentDay, setCurrentDay] = useState(new Date());
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);
  const [insertMessage] = useMutation(SEND_MESSAGE);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
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

  const paginatePosts = useCallback(() => {
    const filteredPosts = data?.messages?.filter((post: any) => {
      const postDate = new Date(parseInt(post?.dateSent));
      return postDate.toDateString() === currentDay.toDateString();
    });
    setPosts(filteredPosts || []);
  }, [data, currentDay]);

  useEffect(() => {
    if (data) {
      paginatePosts();
    }
  }, [data, currentDay, paginatePosts]);

  if (!cookie) return <div>No cookie found</div>;

  const handleDayChange = (increment: number) => {
    const newDate = new Date(currentDay);
    newDate.setDate(currentDay.getDate() + increment);
    setCurrentDay(newDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = textareaRef.current?.value;
    if (message) {
      setIsLoading(true);
      try {
        await insertMessage({
          variables: {
            message: message,
            sender: cookie.emailAddress,
            live: "",
            video: "",
          },
        });
        textareaRef.current.value = '';
      } catch (err) {
        console.error("Error sending message", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      textareaRef.current?.focus();
    }
  };

  if (loading) return <CrowdLoading/>;
  if (error) return <ReusableServerDown/>;

  const renderRow = ({ index, style }: { index: number, style: React.CSSProperties }) => (
    <div className="messagesUL_li" style={{ ...style, width: "100%", marginTop: "5px", alignItems: "center"}}>
      <ReusableMessage Sender={posts[index].Sender} 
                       dateSent={posts[index].dateSent} 
                       Messages={posts[index].Messages}
                       Live={posts[index].Live}
                       Video={posts[index].Video}
                       />
    </div>
  );

  const getItemSize = (index: number) => {
    const message = posts[index].Messages;
    const hasVideo = posts[index].Live; // Adjust this condition based on how you identify videos

    if (hasVideo !==null || hasVideo !=="") {
      return 400; // Fixed height for messages with videos
    } else {
      return Math.max(100, Math.ceil(message.length / 30) * 30); // Dynamic height for text messages
    }
  };
console.log(streaming,"<<<<")
  return (
    <ReusableCenterLayout
      child1={() => (
        <ReusableMessageInput 
          textRef={textareaRef}
          event={handleSubmit}
          loading={isLoading}
        />
      )}
      child2={() => (
        <>
          {streaming !==''?
         <div className='messagesLI'> 
          <video width="320" height="240" src={streaming || null} className='messageVideo'  controls>
          <source src="movie.mp4" type="video/mp4"/>
          <source src="movie.ogg" type="video/ogg"/>
          </video>
          </div>
          :<></>}
        </>
      )}
      child3={() => (
        <VariableSizeList
          height={window.innerHeight}
          width={"100%"}
          itemCount={posts.length}
          itemSize={getItemSize}
          className='messagesUL'
        >
          {renderRow}
        </VariableSizeList>
      )}
      child4={() => <></>}
    />
  );
};

export default Messages;