import { Icon } from '@iconify/react'
import ExpandableText from 'components/Crowd/ExpandableText'
import Image from 'next/image'
import React, { FC } from 'react'
import { setTime } from 'utils/cookie'

type ReusableMessageProps = {
    Sender:string,
    dateSent:string,
    Messages:string
}

const ReusableMessage:FC<ReusableMessageProps> = ({Sender,dateSent,Messages}) => {
 
  const noOfDays = (timestampMs: any) => {
    const currentTime = new Date().getTime(); // Get current timestamp in ms
    const differenceMs = currentTime - parseInt(timestampMs); // Difference in milliseconds
  
    const seconds = Math.floor(differenceMs / 1000); // Convert to seconds
    const minutes = Math.floor(seconds / 60); // Convert to minutes
    const hours = Math.floor(minutes / 60); // Convert to hours
    const days = Math.floor(hours / 24); // Convert to days
    const months = Math.floor(days / 30); // Convert to months
    const years = Math.floor(months / 12); // Convert to years
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`; // Return years if more than 12 months
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`; // Return months if more than 30 days
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`; // Return days if more than 24 hours
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`; // Return hours if more than 1 hour
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`; // Return minutes if more than 1 minute
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`; // Return seconds if less than 1 minute
    }
  };
  
  // Example Usage:
  console.log(noOfDays(1738737991254)); // Output: "1 day ago" / "5 hours ago" / "2 months ago" / "10 seconds ago"
  
    
  return (
      <li className='messagesLI'>
        <div>
          <div className='messageSender'>
            <div className='messageSenderImgcont'>
            <Image 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46'/%3E%3C/svg%3E" 
              alt={Sender} 
              width={50} 
              height={50} 
            />
            </div>
            <div><b>{Sender}</b></div>
            <div>
              <Icon icon="svg-spinners:clock" width="15" height="15" style={{marginLeft:"5px"}}/>{noOfDays(dateSent)}
            </div>
          </div>
          <div className='messageBody'>
          <ExpandableText text={Messages} />
           </div>
          {/* <hr></hr> */}
          <div className='messageReactions'>
            <div className='messageReactionsIcons'>
              <Icon icon="mdi:like" width="24" height="24" style={{"color":"blue"}}/>Like
            </div>
            <div className='messageReactionsIcons'>
              <Icon icon="mdi:comment-outline" width="24" height="24"/>Comment
            </div>
            <div className='messageReactionsIcons'>
              <Icon icon="mdi-light:share" width="24" height="24"/>Share
            </div>
          </div>
        </div>
      </li>
  )
}

export default ReusableMessage