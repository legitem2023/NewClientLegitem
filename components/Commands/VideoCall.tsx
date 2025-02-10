import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { STARTCALL, LIVE } from 'graphql/mutation';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { useDispatch, useSelector } from 'react-redux';
import { setStreaming } from 'Redux/streamingSlice';

const VideoCall = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const dispatch = useDispatch();
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const Manager = useRef(new DataManager()).current;

  const [Live] = useMutation(LIVE, {
    onCompleted: (data) => console.log('Live mutation response:', data),
    onError: (error) => console.error('Live mutation error:', error),
  });

  const HandleLive = async (stream: MediaStream) => {
    try {
      if (!stream) {
        Manager.Error('Invalid stream provided.');
        return;
      }
  
      // Generate a unique stream ID based on the sender
      const streamId = `live-stream-${cookie.emailAddress}`;
  
      await Live({
        variables: {
          message: `${cookie.emailAddress} is Live`,
          sender: cookie.emailAddress,
          live: "true",
          video: stream.id, // ✅ Store stream ID instead of a blob URL
        },
      });
  
      console.log('Live stream started:', streamId);
    } catch (error) {
      console.error('Error in HandleLive:', error);
    }
  };
  
  const setupWebRTC = async () => {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices) {
        return Manager.Error('Media devices not supported');
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((device) => device.kind === 'videoinput');
      const hasMicrophone = devices.some((device) => device.kind === 'audioinput');

      if (!hasCamera && !hasMicrophone) {
        return Manager.Error('No camera or microphone found');
      }

      const localStream = await navigator.mediaDevices.getUserMedia({
        video: hasCamera,
        audio: hasMicrophone,
      });
      dispatch(setStreaming(localStream));

      peerConnectionRef.current = new RTCPeerConnection();
      localStream.getTracks().forEach((track) => peerConnectionRef.current!.addTrack(track, localStream));
      console.log("deployed",localStream);

      HandleLive(localStream); // Send the live stream

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('New ICE candidate:', event.candidate);
          // TODO: Send to signaling server
        }
      };

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
    } catch (error: any) {
      console.error('Error setting up WebRTC:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleStartCall = async () => {
    try {
      await setupWebRTC();
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, []);

  return (
    <div className="VideoCallButton">
      <Icon icon="bxs:video" width="24" height="24" onClick={handleStartCall} />
    </div>
  );
};

export default VideoCall;