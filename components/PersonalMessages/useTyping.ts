import { gql, useMutation } from "@apollo/client";

const SET_USER_TYPING = gql`
  mutation SetUserTyping($senderEmail: String!, $receiverEmail: String!, $isTyping: Boolean!) {
    setUserTyping(senderEmail: $senderEmail, receiverEmail: $receiverEmail, isTyping: $isTyping) {
      senderEmail
      receiverEmail
      isTyping
    }
  }
`;

const useTypingStatus = (senderEmail: string, receiverEmail: string) => {
  const [setUserTyping] = useMutation(SET_USER_TYPING);

  // Use debounce to prevent excessive calls
  let typingTimeout: NodeJS.Timeout;

  const handleTyping = (isTyping: boolean) => {
    clearTimeout(typingTimeout);
    setUserTyping({ variables: { senderEmail, receiverEmail, isTyping } });

    if (isTyping) {
      typingTimeout = setTimeout(() => {
        setUserTyping({ variables: { senderEmail, receiverEmail, isTyping: false } });
      }, 3000); // Stop typing after 3 seconds of inactivity
    }
  };

  return handleTyping;
};
