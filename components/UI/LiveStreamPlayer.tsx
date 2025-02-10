import React, { useEffect, useRef, useState } from "react";

interface LiveStreamPlayerProps {
  stream?: MediaStream | null; // Support WebRTC live stream
  streamUrl?: string | null;   // Support video URLs (MP4, HLS, etc.)
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ stream, streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // ✅ Prevent autoplay issues

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      console.log("Assigning MediaStream to video element:", stream);
      video.srcObject = stream; // ✅ Assign MediaStream
    } else if (streamUrl) {
      console.log("Assigning video URL to video element:", streamUrl);
      video.src = streamUrl; // ✅ Assign URL
    }
  }, [stream, streamUrl]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.error("Playback error:", err));
      setIsPlaying(true); // ✅ Set state to prevent further issues
    }
  };

  return (
    <div className="video-container" onClick={handlePlay}>
      <video ref={videoRef} controls={!isPlaying} className="w-full h-auto">
        Your browser does not support the video tag.
      </video>
      {!isPlaying && <p className="play-overlay">Click to Play</p>}
    </div>
  );
};

export default LiveStreamPlayer;
