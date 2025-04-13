'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { READ_PERSONAL_MESSAGES } from 'graphql/queries'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { setTime } from 'utils/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { POSTPERSONAL_MESSAGES } from 'graphql/mutation'
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions'
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import { useSelector,useDispatch } from 'react-redux';
import TypingIndicator from 'components/UI/TypingIndicator';
import SwiperTabs from 'components/UI/SwiperTabs';
import {setmessagecount} from 'Redux/messagecountSlice';
import {setMessageNotification} from 'Redux/messageNotificationSlice';
import ReusableMessageInput from 'components/Reusable/ReusableMessageInput'
import ReusableMessage from 'components/Reusable/ReusableMessage'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import CrowdLoading from 'components/Crowd/CrowdLoading';
import ReusableServerDown from 'components/Reusable/ReusableServerDown'
import { setDrawer } from 'Redux/drawerSlice';
const Messages = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES, { variables: { emailAddress: cookie.emailAddress } });
  const [insertMessage] = useMutation(POSTPERSONAL_MESSAGES, {
    onCompleted: (data) => {
      textareaRef.current.value = '';
      setIsLoading(false);
    },
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const SelectedReciever = useSelector((state: any) => state.reciever.reciever);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cache = useRef(new CellMeasurerCache({ defaultHeight: 300, fixedWidth: true, fixedHeight: false }));
  const listRef = useRef(null);
  const [currentDay, setCurrentDay] = useState(new Date());
  
  useEffect(() => {
   if (!SelectedReciever) {
     dispatch(setDrawer(false));
     return; // Explicitly return void
  }else{
     dispatch(setDrawer(true));
   }
    const unsubscribe = subscribeToMore({
      document: PERSONAL_MESSAGES_ADDED,
      variables: { receiverEmail: cookie.emailAddress,senderEmail:SelectedReciever },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData?.data) return prev;
        console.log(prev,"<<<");
        const newMessages = subscriptionData.data.messagesNotification;
        
        if(newMessages[0].id===null) return;
       // dispatch(setmessagecount(newMessages.length));
        if(cookie.emailAddress!==newMessages[0].Sender){
          dispatch(setMessageNotification({
          id:newMessages[0].id,
          message:newMessages[0].Messages,
          email:newMessages[0].Sender
        }))
        }
        
       // dispatch(setmessagecount((prevCount: number) => prevCount + newMessages.length));
        const filteredNewMessages = newMessages?.filter(
          (item: any) => (item.Sender === SelectedReciever || item.Sender === cookie.emailAddress) &&
            (item.Reciever === cookie.emailAddress || item.Reciever === SelectedReciever)
        );
        return {
          ...prev,
          personalMessages: prev.personalMessages ? [filteredNewMessages[0], ...prev.personalMessages] : [filteredNewMessages[0]],
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore, cookie.emailAddress, SelectedReciever]);

  
  
  if (loading) return <CrowdLoading />;
  if (error) return <ReusableServerDown />;
  if (SelectedReciever === null || SelectedReciever === undefined || SelectedReciever === "") return;

  // Filter messages by participants and date
  const FilterReciever = data.personalMessages.filter((item: any) => 
    (item.Sender === SelectedReciever || item.Sender === cookie.emailAddress) &&
    (item.Reciever === cookie.emailAddress || item.Reciever === SelectedReciever)
  );

  const filteredPosts = FilterReciever.filter((post: any) => {
    const postDate = new Date(parseInt(post.dateSent));
    return postDate.toDateString() === currentDay.toDateString();
  });

  // Date navigation functions
  const goToPreviousDay = () => setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() - 1)));
  const goToNextDay = () => setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() + 1)));
  const JumpToDate = (date: any) => setCurrentDay(new Date(date.target.value));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const message = textareaRef.current?.value;
    
    if (message) {
      await insertMessage({
        variables: {
          reciever: SelectedReciever,
          message: message,
          sender: cookie.emailAddress,
        },
      });
    } else {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  }

  return (
    <ReusableCenterLayout
      child1={() => (
        <>
          <ReusableMessageInput
            textRef={textareaRef}
            event={handleSubmit}
            loading={isLoading}
          />
          <span style={{ marginTop: "10px" }}>
            Look for a specific Date <input type='date' onChange={JumpToDate} />
          </span>
        </>
      )}

      child2={() => (
        <div style={{ minHeight: '100vh', height: 'auto', width: '100%' }}>
          <TypingIndicator senderEmail={cookie.emailAddress} receiverEmail={SelectedReciever}/>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                rowCount={filteredPosts.length}
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
                      <div style={{ ...style, marginBottom: "15px", padding: "10px 0" }} onLoad={measure}>
                        <ReusableMessage data={filteredPosts[index]} onChange={measure} />
                      </div>
                    )}
                  </CellMeasurer>
                )}
              />
            )}
          </AutoSizer>
        </div>
      )}

      child3={() => (
        <ul className='messagesUL'>
          <li className='messages_pagination'>
            <button className='universalButtonStyle' onClick={goToPreviousDay}>Previous Day</button>
            <button className='universalButtonStyle' onClick={goToNextDay}>Next Day</button>
          </li>
        </ul>
      )}
      
      child4={() => <></>}
    />
  )
}

export default Messages
