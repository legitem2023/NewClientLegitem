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
                    <textarea ref={textRef} id='textarea' placeholder="Message"></textarea>
                </div>
                <div className='Messenger_inputs_sdiv'>
                <VideoCall/>
                <div>
                    <Icon icon={loading?"eos-icons:loading":"material-symbols:send"} onClick={(e)=>event(e)} />
                </div>
                </div>
              </div>
  )
}

export default ReusableMessageInput