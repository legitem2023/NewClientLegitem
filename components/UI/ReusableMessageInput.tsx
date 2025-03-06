import { Icon } from '@iconify/react'
import AudioRecorder from 'components/Commands/AudioRecorder'
import VideoCall from 'components/Commands/VideoCall'
import React, { FC,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useUserTyping from "./useUserTyping";
type ReusableMessageInputProps = {
    textRef:any,
    event:(e:any)=> any,
    loading:any
}
const ReusableMessageInput:FC<ReusableMessageInputProps> = ({textRef,event,loading}) => {
  const dispatch = useDispatch();
  const cookie = useSelector((state:any)=> state.cookie.cookie);
  const SelectedReciever = useSelector((state: any) => state.reciever.reciever);
  const { handleTyping } = useUserTyping();
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    handleTyping(SelectedReciever,cookie.emailAddress,true);
  };

  const handleBlur = () => {
    handleTyping(SelectedReciever,cookie.emailAddress, false);
  };
    
    return (
              <div className='Messenger_inputs'>
                <div className='Messenger_inputs_fdiv'>
                    <input type='text' 
                           ref={textRef} 
                           id='textarea' 
                           onChange={handleChange} 
                           
                           placeholder="Message" 
                           maxLength={1000}/>
                </div>
               <div className='Messenger_inputs_sdiv'>
                <VideoCall/>
                <div>
                    <Icon icon={loading?"eos-icons:loading":"material-symbols-light:send-rounded"} onClick={(e)=>event(e)} />
                </div>
                </div>
              </div>
  )
}

export default ReusableMessageInput
