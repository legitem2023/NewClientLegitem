import { Icon } from '@iconify/react';
import ExpandableText from 'components/Crowd/ExpandableText';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from 'react';
import ReusableFirstLetterImage from './ReusableFirstLetterImage';
import ReusableDropdown from './ReusableDropdown';
import ReusableCollapse from './ReusableCollapse';
import LiveStreamPlayer from './LiveStreamPlayer';
import { useSelector,useDispatch } from 'react-redux';
import { setreciever } from 'Redux/recieverSlice';

interface Message {
  Sender: string;
  dateSent: string | number;
  Messages: string;
  Video?: string | null;
}

interface ReusableMessageProps {
  data: Message;
  onChange?: () => void;
}

const ReusableMessage: FC<ReusableMessageProps> = ({ data, onChange }) => {
  const [expanded, setExpanded] = useState(false);
const router = useRouter();
  const { activeStream, streamId } = useSelector((state: any) => state.streaming);
  const isLiveStream = data.Video && data.Video === streamId;
  const dispatch = useDispatch();
  // ✅ Auto-expand when live stream starts, but allow manual toggling
  useEffect(() => {
    if (isLiveStream && activeStream) {
      setExpanded(true); // Auto-expand if a live stream is detected
    }
  }, [isLiveStream, activeStream]);

  useEffect(() => {
    if (onChange) onChange();
  }, [expanded, onChange]);

  const noOfDays = (timestampMs: string | number) => {
    const currentTime = new Date().getTime();
    const differenceMs = currentTime - Number(timestampMs);

    const seconds = Math.floor(differenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  const border = (data:any) =>{
    if(data.Live==='true'){
      return 'redBorder'
    }else{
      return
    }
  }
  const Message = (reciever) =>{
    dispatch(setreciever(reciever));
    router.push('/Messages');
  }
  return (
    <li className="messagesLI">
      <div>
        <div className="messageSender">
          <div className={`messageSenderImgcont ` + border(data)}>
            <ReusableFirstLetterImage text={data.Sender} size={100} bgColor="rgb(87, 39, 0)" textColor="#ffffff" />
          </div>
          <div className="messageSenderName">
            <ReusableDropdown Name={data.Sender} 
                              child1={()=>(<button style={{padding:'3px',display:'flex',alignItems:'center'}}onClick={()=>Message(data.Sender)}><Icon icon="ic:baseline-message" /> Message</button>)} 
                              child2={()=>(<></>)}/>
          </div>
          <div className="messageSenderTime">
            <Icon icon="svg-spinners:clock" width="15" height="15" style={{ marginLeft: '5px' }} />
            {noOfDays(data.dateSent)}
          </div>
        </div>

        <div className="messageBody">
          <div onClick={() => setExpanded(!expanded)}>
            <ExpandableText text={data.Messages} />
          </div>

          {expanded && (
            isLiveStream && activeStream ? (
              <LiveStreamPlayer stream={activeStream} />
            ) : data.Video ? (
              <LiveStreamPlayer streamUrl={data.Video} />
            ) : (
              <></>
            )
          )}
        </div>

        <div className="messageReactions">
          <div className="messageReactionsIcons">
            <ReusableCollapse 
              NameIcon={()=>(<Icon icon="material-symbols:add-reaction" width="24" height="24" />)} 
              child1={()=>(<ul>
                                  <li>
                                        <button style={{padding:'3px',display:'flex',alignItems:'center'}}onClick={()=>Message(data.Sender)}><Icon icon="ic:baseline-message" /> Like</button>)} 
                                  </li>
                                  <li>
                                        <button style={{padding:'3px',display:'flex',alignItems:'center'}}onClick={()=>Message(data.Sender)}><Icon icon="ic:baseline-message" /> Heart</button>)} 
                                  </li>
                                  <li>
                                        <button style={{padding:'3px',display:'flex',alignItems:'center'}}onClick={()=>Message(data.Sender)}><Icon icon="ic:baseline-message" /> Smile</button>)} 
                                  </li>
                                  <li>
                                        <button style={{padding:'3px',display:'flex',alignItems:'center'}}onClick={()=>Message(data.Sender)}><Icon icon="ic:baseline-message" /> Laugh</button>)} 
                                  </li>
                                  <li>
                                        <button style={{padding:'3px',display:'flex',alignItems:'center'}}onClick={()=>Message(data.Sender)}><Icon icon="ic:baseline-message" /> Mock</button>)} 
                                  </li>
                                  <li>
                                        <button style={{padding:'3px',display:'flex',alignItems:'center'}}onClick={()=>Message(data.Sender)}><Icon icon="ic:baseline-message" /> Angry</button>)} 
                                  </li>
                              </ul>)}/>
          
          </div>
          <div className="messageReactionsIcons">
            <Icon icon="mdi:comment-outline" width="24" height="24" />
            Comment
          </div>
          <div className="messageReactionsIcons">
            <Icon icon="mdi-light:share" width="24" height="24" />
            Share
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReusableMessage;
