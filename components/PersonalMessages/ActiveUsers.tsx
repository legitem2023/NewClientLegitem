import {  useQuery, useSubscription } from '@apollo/client'
import { READ_ACTIVE_USER } from 'graphql/queries';
import { READ_PERSONAL_MESSAGES,  } from 'graphql/queries'
import { GROUP_SENDER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions';
import { setDrawer } from 'Redux/drawerSlice';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setreciever } from 'Redux/recieverSlice';
import ReusableFirstLetterImage from 'components/UI/ReusableFirstLetterImage';
import ReusableNotification from 'components/UI/ReusableNotification';
import LimitedText from 'components/UI/LimitedText';
const ActiveUsers = ({email}) => {
  const dispatch = useDispatch();
  const cookie = useSelector((state:any)=> state.cookie.cookie);
  const messageNotification = useSelector((state:any)=>state.messageNotification);
  const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES,{variables:{emailAddress:cookie.emailAddress}});

  if(loading) return

const uniqueSenders = Array.from(
  new Map(
    data.personalMessages
      .filter((itm: any) => itm.Sender !== cookie.emailAddress)
      .sort((a: any, b: any) => new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime()) // Sort descending
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
  <div style={{display:'flex', fontWeight: 'bold',alignItems:'center',padding:'3px'}}>{sender.Sender}</div>
<ReusableNotification number={messageNotification.filter((not:any)=>not.email===sender.Sender).length}/>
  {/* Message Preview */}
  <div style={{ display:'flex',color: 'gray',alignItems:'center',padding:'3px'}}>
    <LimitedText text={sender.Messages} />
  </div>
</li>
    ))}    
    </ul> )
}

export default ActiveUsers
