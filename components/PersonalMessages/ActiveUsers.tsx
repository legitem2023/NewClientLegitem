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
const ActiveUsers = ({email}) => {
  const dispatch = useDispatch();

  const cookie = useSelector((state:any)=> state.cookie.cookie);

  const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES,{variables:{emailAddress:cookie.emailAddress}});

  if(loading) return

  console.log(data.personalMessages);

const uniqueSenders = Array.from(
  new Set(
    data.personalMessages
      .filter((itm: any) => itm.Sender !== cookie.emailAddress)
      .map((itm: any) => itm.Sender)
  )
);

  
  return (
    <ul className='Menu'>
    
    <li><input type='text' style={{padding:'5px',
                                   boxShadow:'inset 0.5px 0.5px 3px #000000',
                                   border:'none',                                                      width:'100%',
                                   boxSizing:'border-box'}}/></li>
    <li className='Menu_label'>Conversations</li>
 {uniqueSenders.map((sender:any, idx:number) => (
      <li key={idx} 
        style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}
        onClick={()=>{
          dispatch(setreciever(sender));
          dispatch(setDrawer(true));
        }}>
        <ReusableFirstLetterImage
          text={sender}
          size={100}
          bgColor="rgb(87, 39, 0)"
          textColor="#ffffff"
        />
        {sender}
      </li>
    ))}    
    </ul> )
}

export default ActiveUsers
