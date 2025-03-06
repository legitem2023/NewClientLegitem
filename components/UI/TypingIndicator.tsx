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

const TypingIndicator = ({ senderEmail, receiverEmail }) => {
  const { data } = useSubscription(USER_TYPING_SUBSCRIPTION, {
    variables: { senderEmail, receiverEmail }
  });

  return data?.userTyping?.isTyping ? (
    <p>{data.userTyping.senderEmail} is typing...</p>
  ) : null;
};

export default TypingIndicator
