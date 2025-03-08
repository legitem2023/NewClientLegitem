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
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showbutton,setshowbutton] = useState(false);
  // Subscribe to offers only when user clicks connect
  const { data } = useSubscription(OFFER_SUBSCRIPTION, {
    skip: !isSubscribed
  });

  const handleConnect = async () => {
    try {
      setIsSubscribed(true);
      setError(null);
    } catch (err) {
      setError('Connection failed: ' + err.message);
    }
  };

  const handleDisconnect = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (remoteVideoRef.current?.srcObject) {
      (remoteVideoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach(track => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
    setStreaming(false);
    setIsSubscribed(false);
  };

  useEffect(() => {
    if (!data?.offer) return;
    setshowbutton(true);
    const setupPeerConnection = async () => {
      try {
        peerConnection.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            sendIceCandidate({
              variables: { candidate: JSON.stringify(event.candidate) }
            });
          }
        };

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
        
        await createAnswer({
          variables: { answer: JSON.stringify(answer) }
        });
      } catch (err) {
        setError('Connection error: ' + err.message);
        setStreaming(false);
      }
    };

    setupPeerConnection();
  }, [data]);

  return (
    <div style={{position:'relative',display:'flex',justifyContent:'flex-start'}}>
  <video ref={remoteVideoRef} autoPlay />
  {error && <div className="error">{error}</div>}
  <div className="controls">
    {!isSubscribed ? (
      showbutton ? (
        <button onClick={handleConnect} disabled={isSubscribed}>
          Connect to Stream
        </button>
      ) : null
    ) : (
      <button onClick={handleDisconnect} disabled={!isSubscribed}>
        Disconnect
      </button>
    )}
    {isSubscribed && !streaming && <div>Connecting...</div>}
  </div>
</div>
  );
};
export default Receiver;
