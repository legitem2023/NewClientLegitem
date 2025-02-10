import { Icon } from '@iconify/react';
import ExpandableText from 'components/Crowd/ExpandableText';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import ReusableFirstLetterImage from './ReusableFirstLetterImage';

type ReusableMessageProps = {
  children:any;
  onChange: any;
};

const ReusableMessage: FC<ReusableMessageProps> = ({ children, onChange }) => {

  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    onChange && onChange();
  }, [expanded, onChange]);

  const noOfDays = (timestampMs: any) => {
    const currentTime = new Date().getTime();
    const differenceMs = currentTime - parseInt(timestampMs);

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
  return (
    <li className='messagesLI'>
      <div>
        <div className='messageSender'>
          <div className='messageSenderImgcont'>
          <ReusableFirstLetterImage text={children.Sender} size={100} bgColor={"#007bff"} textColor={"#ffffff"} />
          </div>
          <b className='messageSenderName'>{children.Sender}</b>
          <div className='messageSenderTime'>
            <Icon icon="svg-spinners:clock" width="15" height="15" style={{ marginLeft: "5px" }} />
            {noOfDays(children.dateSent)}
          </div>
        </div>
        <div className='messageBody'>
          <div onClick={() => setExpanded(!expanded)}>
            <ExpandableText text={children.Messages}/>
          </div>
          {/* {Video && <video src={Video} className="messageVideo" autoPlay controls />} */}
        </div>
        <div className='messageReactions'>
          <div className='messageReactionsIcons'>
            <Icon icon="material-symbols:add-reaction" width="24" height="24" />React()
          </div>
          <div className='messageReactionsIcons'>
            <Icon icon="mdi:comment-outline" width="24" height="24" />Comment
          </div>
          <div className='messageReactionsIcons'>
            <Icon icon="mdi-light:share" width="24" height="24" />Share
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReusableMessage;