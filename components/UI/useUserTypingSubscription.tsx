import { gql, useSubscription } from "@apollo/client";

const USER_TYPING_SUBSCRIPTION = gql`
  subscription UserTyping($senderEmail: String!, $receiverEmail: String!) {
    userTyping(senderEmail: $senderEmail, receiverEmail: $receiverEmail) {
      senderEmail
      receiverEmail
      isTyping
    }
  }
`;

const useUserTypingSubscription = (senderEmail: string, receiverEmail: string) => {
  const { data } = useSubscription(USER_TYPING_SUBSCRIPTION, {
    variables: { senderEmail, receiverEmail },
  });

  return data?.userTyping;
};

export default useUserTypingSubscription;
