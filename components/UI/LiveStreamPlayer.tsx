import React, { useEffect, useRef } from "react";

interface LiveStreamPlayerProps {
  stream?: MediaStream | null; // WebRTC live stream
  streamUrl?: string | null;   // Regular video URL
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ stream, streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      console.log("Assigning MediaStream to video element:", stream);
      video.srcObject = stream; // ✅ Assign MediaStream
      video.load();
    } else if (streamUrl) {
      console.log("Assigning video URL to video element:", streamUrl);
      video.src = streamUrl; // ✅ Assign URL
      video.load();
    }

    video.play().catch((err) => console.error("Playback error:", err));
  }, [stream, streamUrl]);

  return (
    <video ref={videoRef} controls autoPlay className="w-full h-auto">
      Your browser does not support the video tag.
    </video>
  );
};

export default LiveStreamPlayer;
