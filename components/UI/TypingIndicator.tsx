import React from "react";
import useUserTypingSubscription from "./useUserTypingSubscription";

const TypingIndicator = ({ senderEmail, receiverEmail }: { senderEmail: string; receiverEmail: string }) => {
  const typingData = useUserTypingSubscription(senderEmail, receiverEmail);
  console.log(typingData?.isTyping,"<---");
  return typingData?.isTyping ? <p>{typingData.senderEmail} is typing...</p> : null;
};

export default TypingIndicator;
