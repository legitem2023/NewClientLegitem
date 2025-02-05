import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { STARTCALL } from 'graphql/mutation';
import { CALL_RECIEVE } from 'graphql/subscriptions';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';

const VideoCall = () => {
  const [callActive, setCallActive] = useState(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const Manager = new DataManager();
  // Mutation to start a call
  const [startCall] = useMutation(STARTCALL, {
    onCompleted: (data) => {
      console.log('Call started:', data);
      setCallActive(true);
    },
    onError: (error) => {
      console.error('Error starting call:', error);
    },
  });

  // Subscription for incoming calls
  useSubscription(CALL_RECIEVE, {
    onSubscriptionData: ({ subscriptionData }) => {
      const call = subscriptionData.data.callReceived;
      console.log('Incoming call:', call);
      setupWebRTC();
    },
  });

  const handleStartCall = async () => {
    try {
      await setupWebRTC();
      startCall({
        variables: {
          callInput: { from: '1', to: '2' }, // Replace with actual user IDs
        },
      });
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const setupWebRTC = async () => {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices) {
        // throw new Error('Media devices not supported');
        Manager.Error('Media devices not supported');
      }

      // **Check if user media devices exist**
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((device) => device.kind === 'videoinput');
      const hasMicrophone = devices.some((device) => device.kind === 'audioinput');

      if (!hasCamera && !hasMicrophone) {
        Manager.Error('No camera or microphone found');
        return
        // throw new Error('No camera or microphone found');
      }

      // **Request user media**
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: hasCamera, // Enable only if a camera is available
        audio: hasMicrophone, // Enable only if a microphone is available
      });

      // if (localVideoRef.current) {
      //   localVideoRef.current.srcObject = localStream;
      // }

      const peerConnection = new RTCPeerConnection();

      // **Add local stream to peer connection**
      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

      // **Handle remote stream**
      peerConnection.ontrack = (event) => {
        const newRemoteStream = new MediaStream();
        newRemoteStream.addTrack(event.track);
        
        // console.log(newRemoteStream+"<<<<<<")
        // setRemoteStream(newRemoteStream);
        // if (remoteVideoRef.current) {
        //   remoteVideoRef.current.srcObject = newRemoteStream;
        // }
      };

      // **Create offer and set local description**
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // **Handle ICE candidates**
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('New ICE candidate:', event.candidate);
          // Send the candidate to the remote peer via your signaling system
        }
      };
    } catch (error) {
      console.error('Error setting up WebRTC:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className='VideoCallContainer'>
      <Icon icon="mdi:video" width="24" height="24" onClick={handleStartCall} />
      {/* {callActive && (
        <div className='VideoCallContainerVideos'>
          <video ref={localVideoRef} autoPlay muted />
          <video ref={remoteVideoRef} autoPlay />
        </div>
       )} */}
    </div>
  );
};

export default VideoCall;
