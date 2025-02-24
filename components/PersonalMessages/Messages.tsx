'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { READ_PERSONAL_MESSAGES,  } from 'graphql/queries'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { setTime } from 'utils/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { setDrawer } from 'Redux/drawerSlice';
// import { useGlobalState } from 'state'
import { POSTPERSONAL_MESSAGES } from 'graphql/mutation'
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions'
import ReusableCenterLayout from 'components/Layout/ReusableCenterLayout'
import { useSelector,useDispatch } from 'react-redux'
import ReusableMessageInput from 'components/UI/ReusableMessageInput'
import ReusableMessage from 'components/UI/ReusableMessage'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import CrowdLoading from 'components/Crowd/CrowdLoading';
import ReusableServerDown from 'components/UI/ReusableServerDown'
const Messages = ({reciever}) => {
  const cookie = useSelector((state:any)=> state.cookie.cookie);
  const dispatch = useDispatch();
  const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES,{variables:{emailAddress:cookie.emailAddress}});
    const [insertMessage] = useMutation(POSTPERSONAL_MESSAGES,{
        onCompleted: (data) => {
            textareaRef.current.value = '';
            setIsLoading(false);
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const SelectedReciever = useSelector((state:any)=>state.reciever.reciever);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
      const cache = useRef(new CellMeasurerCache({ defaultHeight: 300, fixedWidth: true,fixedHeight:false }));
      const listRef = useRef(null);
    
    const [currentDay, setCurrentDay] = useState(new Date()); // Track current day
    useEffect(() => {
        const unsubscribe = subscribeToMore({
          document: PERSONAL_MESSAGES_ADDED,
          variables: { emailAddress: cookie.emailAddress, reciever: SelectedReciever }, // Pass any necessary variables
          updateQuery: (prev, { subscriptionData }) => {
            
            if (!subscriptionData?.data) return;
            
            const newMessages = subscriptionData?.data?.messagesPersonal;
            
            // Filter messages for the correct sender/receiver pair
            const filteredNewMessages = newMessages?.filter(
              (item: any) => (item.Sender === SelectedReciever || item.Sender === cookie.emailAddress) &&
                             (item.Reciever === cookie.emailAddress || item.Reciever === SelectedReciever)
            );
      
            if (!filteredNewMessages || filteredNewMessages.length === 0) return prev;
            // Filter out any duplicates based on a unique identifier (assuming message.id exists)
            const uniqueNewMessages = filteredNewMessages.filter(
              (newMsg: any) => !prev.personalMessages.some((prevMsg: any) => prevMsg.id === newMsg.id)
            );
            
            // Add new messages to the end of the list
            if (uniqueNewMessages.length === 0) return prev;
            return {
              ...prev,
              personalMessages: [
                ...uniqueNewMessages, // Add only unique new messages
                ...prev.personalMessages
              ]
            };
          },
        });
      
        return () => {
          unsubscribe();
        };
      }, [subscribeToMore, cookie.emailAddress, SelectedReciever]);
  useEffect(() => {
  if (SelectedReciever === "") {
    dispatch(setDrawer(false));
  }
}, [SelectedReciever, dispatch]); // Include dispatch in the dependency array
      if (loading) return <CrowdLoading />
      if (error) return <ReusableServerDown/>
// Add necessary dependencies
//########################## MUTATION PART START ##########################
    const FilterReciever = data?.personalMessages.filter((item: any) => (item.Sender===SelectedReciever || item.Sender === cookie.emailAddress) && (item.Reciever===cookie.emailAddress || item.Reciever === SelectedReciever))
        const filteredPosts = FilterReciever.filter((post: any) => {
      const postDate = new Date(parseInt(post.dateSent)); // Convert timestamp to date
      return (
        postDate.toDateString() === currentDay.toDateString()
      );
    });

  
  const JumpToDate = (date: any) => {
    setCurrentDay(date);
  }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const message = textareaRef.current?.value;
        if (message) {
            await insertMessage({
                variables: {
                    reciever:SelectedReciever,
                    message: message,
                    sender: cookie.emailAddress,
                },
            });
        } else {
            setIsLoading(false);
            textareaRef.current?.focus();
        }
    }


    const getItemSize = (index: number) => {
      return Math.max(400, Math.ceil(filteredPosts[index].Messages.length / 30) * 30); 
    };
  if (SelectedReciever === "") return
//########################## MUTATION PART END ##########################
    return (
      <ReusableCenterLayout 
        child1={()=>(
          <>
              <ReusableMessageInput 
              textRef={textareaRef}
              event={handleSubmit}
              loading={isLoading}
            />
              <span style={{marginTop:"10px"}}>
                  Look for a specific Date <input type='date' onChange={(e) => JumpToDate(new Date(e.target.value))}/>
              </span>
          </>
        )}

        child2={()=>(
<div style={{ minHeight: '100vh', height: 'auto', width: '100%'}}>
<AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                rowCount={FilterReciever.length}
                // className='messagesUL'
                ref={listRef}
                rowRenderer={({ key, index, style, parent }) => (
                  <CellMeasurer 
                    key={key} 
                    cache={cache.current} 
                    columnIndex={0} 
                    rowIndex={index} 
                    parent={parent}>
                    {({ measure }) => ( // Ensure it remeasures on changes
                      <div style={{
                        ...style,
                        marginBottom: "15px",
                        padding: "10px 0",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }} onLoad={measure}>
                        <ReusableMessage data={FilterReciever[index]} onChange={measure}/>
                      </div>
                    )}
                  </CellMeasurer>
                )}
              />
            )}
          </AutoSizer>
        </div>
        )}

        child3={()=><></>}
        
        child4={()=><></>}
      />
    )
}

export default Messages
