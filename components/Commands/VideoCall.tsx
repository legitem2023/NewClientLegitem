import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { STARTCALL, LIVE } from 'graphql/mutation';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { useDispatch, useSelector } from 'react-redux';
import { setstreaming } from 'Redux/streamingSlice';

const VideoCall = () => {
  const cookie = useSelector((state: any) => state.cookie.cookie);
  const dispatch = useDispatch();
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const Manager = useRef(new DataManager()).current;

  const [Live] = useMutation(LIVE, {
    onCompleted: (data) => console.log('Live mutation response:', data),
    onError: (error) => console.error('Live mutation error:', error),
  });

  const HandleLive = async (stream: any) => {
    try {
      // Check if the stream is valid
      if (!stream) {
        Manager.Error('Invalid stream provided.');
        return;
      }
  
      // Convert the stream to a URL or other string representation
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length === 0) {
        Manager.Error('No video track found.');
        return;
      }
  
      // Example: Convert the stream to a Blob URL
      let videoUrl;
      try {
        const videoBlob = new Blob([stream], { type: 'video/webm' });
        videoUrl = URL.createObjectURL(videoBlob);
      } catch (error:any) {
        Manager.Error('Error creating Blob URL:');
        return;
      }
  
      // Ensure videoUrl is valid
      if (!videoUrl) {
        Manager.Error('Failed to generate video URL.');
        return;
      }
  
      // Send the live stream data via GraphQL mutation
      await Live({
        variables: {
          message: `${cookie.emailAddress} is Live`,
          sender: cookie.emailAddress,
          live: "true",
          video: videoUrl, // Pass the URL as a string
        },
      });
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

      dispatch(setstreaming(localStream));

      peerConnectionRef.current = new RTCPeerConnection();
      localStream.getTracks().forEach((track) => peerConnectionRef.current!.addTrack(track, localStream));

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