// components/Sender.tsx
import { useEffect, useRef, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { CREATE_OFFER_MUTATION, ICE_CANDIDATE_MUTATION } from 'graphql/mutation';
import {  ANSWER_SUBSCRIPTION  } from 'graphql/subscriptions';



const Sender = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection>();
  const [createOffer] = useMutation(CREATE_OFFER_MUTATION);
  const [sendIceCandidate] = useMutation(ICE_CANDIDATE_MUTATION);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      // Add tracks to connection
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
      
      await createOffer({
        variables: { offer: JSON.stringify(offer) }
      });

      setStreaming(true);
      setError(null);
    } catch (err) {
      setError('Failed to start streaming: ' + err.message);
      setStreaming(false);
    }
  };

  const stopStreaming = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localVideoRef.current?.srcObject) {
      (localVideoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  // Listen for answers
  const { data } = useSubscription(ANSWER_SUBSCRIPTION);
  useEffect(() => {
    if (data?.answer && peerConnection.current) {
      const answer = JSON.parse(data.answer);
      peerConnection.current.setRemoteDescription(answer);
    }
  }, [data]);

  return (
    <div style={{position:'relative',display:'flex',justifyContent:'flex-start'}}>
      <video ref={localVideoRef} autoPlay muted  style={{transform:'scaleX(-1)',width:'100%'}}/>
      {error && <div className="error">{error}</div>}
      <div className="controls">
        {!streaming ? (
          <button onClick={startStreaming} disabled={streaming}>
            Start Streaming
          </button>
        ) : (
          <button onClick={stopStreaming} disabled={!streaming}>
            Stop Streaming
          </button>
        )}
      </div>
    </div>
  );
};
export default Sender;
