// components/Receiver.tsx
import { useEffect, useRef, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { CREATE_ANSWER_MUTATION, ICE_CANDIDATE_MUTATION } from 'graphql/mutation';
import { OFFER_SUBSCRIPTION } from 'graphql/subscriptions';

const Receiver = () => {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection>();
  const [createAnswer] = useMutation(CREATE_ANSWER_MUTATION);
  const [sendIceCandidate] = useMutation(ICE_CANDIDATE_MUTATION);
  const [streaming, setStreaming] = useState(false);

  // Subscribe to offers
  const { data } = useSubscription(OFFER_SUBSCRIPTION);
  
  useEffect(() => {
    if (!data?.offer) return;

    const setupPeerConnection = async () => {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      // ICE Candidate handler
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendIceCandidate({
            variables: { candidate: JSON.stringify(event.candidate) }
          });
        }
      };

      // Set remote stream
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          setStreaming(true);
        }
      };

      const offer = JSON.parse(data.offer);
      await peerConnection.current.setRemoteDescription(offer);
      
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      
      createAnswer({
        variables: { answer: JSON.stringify(answer) }
      });
    };

    setupPeerConnection();
  }, [data]);

  return streaming ? <video ref={remoteVideoRef} autoPlay /> : <div>Waiting for stream...</div>;
};

export default Receiver;
