// components/Sender.tsx
import { useEffect, useRef } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { CREATE_OFFER_MUTATION, ICE_CANDIDATE_MUTATION } from 'graphql/mutation';
import { ANSWER_SUBSCRIPTION } from 'graphql/subscriptions';

const Sender = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection>();
  const [createOffer] = useMutation(CREATE_OFFER_MUTATION);
  const [sendIceCandidate] = useMutation(ICE_CANDIDATE_MUTATION);

  // Setup media and peer connection
  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      // Create peer connection
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      // Add local stream to connection
      stream.getTracks().forEach(track => {
        peerConnection.current!.addTrack(track, stream);
      });

      // ICE Candidate handler
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendIceCandidate({
            variables: { candidate: JSON.stringify(event.candidate) }
          });
        }
      };

      // Create and send offer
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      
      createOffer({
        variables: { offer: JSON.stringify(offer) }
      });
    };

    init();
  }, []);

  // Listen for answers
  const { data } = useSubscription(ANSWER_SUBSCRIPTION);
  useEffect(() => {
    if (data?.answer) {
      const answer = JSON.parse(data.answer);
      peerConnection.current?.setRemoteDescription(answer);
    }
  }, [data]);

  return <video ref={localVideoRef} autoPlay muted />;
};

export default Sender;
