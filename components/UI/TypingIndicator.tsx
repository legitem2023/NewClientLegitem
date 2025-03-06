import React from "react";
import { Icon } from '@iconify/react';
import useUserTypingSubscription from "./useUserTypingSubscription";

const TypingIndicator = ({ senderEmail, receiverEmail }: { senderEmail: string; receiverEmail: string }) => {
  const typingData = useUserTypingSubscription(senderEmail, receiverEmail);
  return typingData?.isTyping ? <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#f1f1f1',padding:'3px',boxShadow:'0.5px 0.5px 3px #000000',marginTop:'5px',marginBottom:'5px'}}>
    
    {typingData.receiverEmail} is typing <Icon icon="svg-spinners:3-dots-bounce" width="24" height="24" /> </div> : null;
};

export default TypingIndicator;
