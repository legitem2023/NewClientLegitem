import React from "react";
import { Icon } from '@iconify/react';
import useUserTypingSubscription from "./useUserTypingSubscription";

const TypingIndicator = ({ senderEmail, receiverEmail }: { senderEmail: string; receiverEmail: string }) => {
  const typingData = useUserTypingSubscription(senderEmail, receiverEmail);
  console.log(typingData?.isTyping,"<---");
  return typingData?.isTyping ? <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>{typingData.receiverEmail} is typing <Icon icon="svg-spinners:3-dots-bounce" width="24" height="24" /> </div> : null;
};

export default TypingIndicator;
