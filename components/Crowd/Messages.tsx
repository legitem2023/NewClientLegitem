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

const Messages = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  


  // Hooks are now always called unconditionally
  const [currentDay, setCurrentDay] = useState(new Date());
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);
  const [insertMessage] = useMutation(SEND_MESSAGE);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [posts, setPosts] = useState<any[]>([]);


  // subscribeToMore should be inside useEffect to ensure it's called only once
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

  // Paginate posts by the current day
  const paginatePosts = useCallback(() => {
    const filteredPosts = data?.messages?.filter((post: any) => {
      // const postDate = new Date(parseInt(post?.dateSent));
      // return postDate.toDateString() === currentDay.toDateString();
    });
    setPosts(filteredPosts || []);
  }, [data, currentDay]);

  // Effect to paginate posts whenever data or currentDay changes
  useEffect(() => {
    if (data) {
      paginatePosts();
    }
  }, [data, currentDay, paginatePosts]);
  // Early return if cookie doesn't exist
  if (!cookie) return <div>No cookie found</div>;
  // Handle day change (previous/next day)
  const handleDayChange = (increment: number) => {
    const newDate = new Date(currentDay);
    newDate.setDate(currentDay.getDate() + increment);
    setCurrentDay(newDate);
  };

  // Handle message submission
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

  // Handle loading and error states
  if (loading) return <CrowdLoading/>;
  if (error) return <div>{error.message}</div>;
  // Render each message row
  const renderRow = ({ index, style }: { index: number, style: React.CSSProperties }) => (
    <div className="messagesUL_li" style={{ ...style, width: "100%", marginTop: "5px", display: "flex", alignItems: "center",borderRadius:"10px",padding:"10px" }}>
      <ReusableMessage Sender={posts[index].Sender} 
                       dateSent={posts[index].dateSent} 
                       Messages={posts[index].Messages} />
    </div>
  );
  // Calculate item size for the variable size list
  const getItemSize = (index: number) => {
    return Math.max(400, Math.ceil(posts[index].Messages.length / 30) * 30); 
  };
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
        <VariableSizeList
          height={window.innerHeight}
          width={"100%"}
          itemCount={posts.length}
          itemSize={getItemSize} // Height of each row
          className='messagesUL'
        >
          {renderRow}
        </VariableSizeList>
      )}
      child3={() => <></>}
      child4={() => <></>}
    />
  );
};

export default Messages;
