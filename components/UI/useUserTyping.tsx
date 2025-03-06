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

const useUserTyping = () => {
  const [setUserTyping] = useMutation(SET_USER_TYPING);

  const handleTyping = (senderEmail: string, receiverEmail: string, isTyping: boolean) => {
    setUserTyping({
      variables: { senderEmail, receiverEmail, isTyping },
    }).catch((err) => console.error("Typing error:", err));
  };

  return { handleTyping };
};

export default useUserTyping;
