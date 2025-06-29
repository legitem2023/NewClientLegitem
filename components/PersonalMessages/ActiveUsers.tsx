import {  useQuery, useSubscription } from '@apollo/client'
import { READ_ACTIVE_USER } from 'graphql/queries';
import { READ_PERSONAL_MESSAGES,  } from 'graphql/queries'
import { GROUP_SENDER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions';
import { setDrawer } from 'Redux/drawerSlice';
import { removeMessageNotificationByEmail } from 'Redux/messageNotificationSlice';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setreciever } from 'Redux/recieverSlice';
import ReusableFirstLetterImage from 'components/Reusable/ReusableFirstLetterImage';
import ReusableNotification from 'components/Reusable/ReusableNotification';
import LimitedText from 'components/UI/LimitedText';
const ActiveUsers = ({email}) => {
  const dispatch = useDispatch();
  const cookie = useSelector((state:any)=> state.cookie.cookie);
  const messageNotification = useSelector((state:any)=>state.messageNotification);
 const handleRemoveByEmail = (email: string) => {
    // Dispatch the action to remove notification by email
    dispatch(removeMessageNotificationByEmail(email));
  };
  const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES,{variables:{emailAddress:cookie.emailAddress}});
 const comparison = (compare: string) => {
   return messageNotification.filter((not:any)=>not.email===compare).length;
 }
 const newMsg = (compare: string,message: string) => {
   const check = messageNotification.filter((not:any)=>not.email===compare).length;
   const msg = messageNotification.filter((not:any)=>not.email===compare).map((item:any) =>{ return item.message});
   return check > 0?msg:message
 }
  
  if(loading) return


const uniqueSenders = Array.from(
  new Map(
    data.personalMessages
      .filter((itm: any) => itm.Sender !== cookie.emailAddress)
      .map((itm: any) => [itm.Sender, itm]) // Keep latest message per sender
  ).values() // Extract unique messages
);
 
  return (
    <ul className='Menu'>
    
    <li><input type='text' style={{padding:'5px',
                                   boxShadow:'inset 0.5px 0.5px 3px #000000',
                                   border:'none',
                                   width:'100%',
                                   boxSizing:'border-box'}}/></li>
    <li className='Menu_label'>Conversations</li>
 {uniqueSenders.map((sender:any, idx:number) => (
<li
  key={idx}
  style={{
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto auto',
    gap: '3px', // Mas maluwag na spacing
    alignItems: 'center', // Para pantay ang vertical alignment
    overflow: 'auto',
    padding: '3px', // Magdagdag ng padding para hindi dikit-dikit
  }}
  onClick={() => {
    handleRemoveByEmail(sender.Sender);
    dispatch(setreciever(sender.Sender));
    dispatch(setDrawer(true));
  }}
>
  {/* Profile Image */}
  <div style={{ gridRow: '1 / span 2', display: 'flex', alignItems: 'center',padding:'3px'}}>
    <ReusableFirstLetterImage
      text={sender.Sender}
      size={50} // Mas maliit para mas maayos sa layout
      bgColor="rgb(87, 39, 0)"
      textColor="#ffffff"
    />
  </div>

  {/* Sender Name */}
  <div style={{display:'flex', 
               fontWeight: 'bold',
               alignItems:'center',
               whiteSpace: nowrap,       /* Prevents text from wrapping */
               overflow: hidden,          /* Hides the overflowing text */
               textOverflow: ellipsis,   /* Adds the "..." */
               padding:'3px'}}>{sender.Sender}</div>
  {/* Message Preview */}
  <div style={{ display:'flex',
                color: comparison(sender.Sender) > 0?'black':'gray',
                alignItems:'center', 
                padding:'3px',
                fontWeight:comparison(sender.Sender) > 0?'bold':'normal'
              }}>
    <LimitedText text={newMsg(sender.Sender,sender.Messages)} />
  </div>
  <ReusableNotification number={comparison(sender.Sender)}/>
</li>
    ))}    
    </ul> )
}

export default ActiveUsers
