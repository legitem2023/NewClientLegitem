import { gql } from "@apollo/client"
//*************** subscription ***************/
export const ANSWER_SUBSCRIPTION = gql`
  subscription AnswerSubscription {
    answer
  }
`;

export const OFFER_SUBSCRIPTION = gql`
  subscription OfferSubscription {
    offer
  }
`;


export const ORDER_STATUS_SUBSCRIPTION = gql`
subscription MessageToOrder {
  messageToOrder {
    id
    Image
    Size
    Color
    productCode
    emailAddress
    TrackingNo
    OrderNo
    Quantity
    Price
    Address
    Contact
    StoreEmail
    dateCreated
    agentEmail
    StatusText
    OrderStatus
  }
}
`;

export const READ_NEWS_SUBSCRIPTION = gql`
subscription MessageNews {
  messageNews {
    id
    title
    thumbnail
    summary
    postedBy
    dateCreated
  }
}`

export const PERSONAL_MESSAGES_ADDED = gql`
subscription MessagesNotification {
  messagesNotification {
    id
    Messages
    Sender
    Reciever
    dateSent
  }
}
`

export const ACTIVE_USERS = gql`
subscription ActiveUserList {
  ActiveUserList {
    accountEmail
    fullname
  }
}
`


export const MESSAGE_ADDED = gql`
subscription Subscription {
  messageAdded {
    id
    Messages
    Sender
    Live
    Video
    dateSent
  }
}`

export const USER_TYPING_SUBSCRIPTION = gql`
  subscription UserTyping($senderEmail: String!, $receiverEmail: String!) {
    userTyping(senderEmail: $senderEmail, receiverEmail: $receiverEmail) {
      senderEmail
      receiverEmail
      isTyping
    }
}`


export const CALL_RECIEVE = gql`
subscription CallReceived {
  callReceived {
    from {
      id
      email
      accountCode
      password
      accountLevel
      loginAttemp
      macAddress
      agentIdentity
      image
      dateCreated
      dateUpdated
      nameOfStore
    }
    to {
      id
      email
      accountCode
      password
      accountLevel
      loginAttemp
      macAddress
      agentIdentity
      image
      dateCreated
      dateUpdated
      nameOfStore
    }
  }
}
`
