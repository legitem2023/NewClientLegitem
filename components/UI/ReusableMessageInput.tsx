import { Icon } from '@iconify/react'
import AudioRecorder from 'components/Commands/AudioRecorder'
import VideoCall from 'components/Commands/VideoCall'
import React, { FC } from 'react'

type ReusableMessageInputProps = {
    textRef:any,
    event:(e:any)=> any,
    loading:any
}
const ReusableMessageInput:FC<ReusableMessageInputProps> = ({textRef,event,loading}) => {
  return (
              <div className='Messenger_inputs'>
                <div className='Messenger_inputs_fdiv'>
                    <input type='text' ref={textRef} id='textarea' placeholder="Message"/>
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
