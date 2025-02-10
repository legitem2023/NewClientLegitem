import React, { useEffect, useRef, useState } from "react";

interface LiveStreamPlayerProps {
  stream?: MediaStream | null; // WebRTC live stream
  streamUrl?: string | null;   // Blob or video URL
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ stream, streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null); // Store blob URL

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      console.log("Assigning MediaStream to video element:", stream);
      video.srcObject = stream; // ✅ Direct WebRTC stream
    } else if (streamUrl) {
      console.log("Processing video URL:", streamUrl);
      
      if (streamUrl.startsWith("blob:")) {
        // ✅ If it's already a blob URL, assign it directly
        video.src = streamUrl;
      } else {
        // ✅ Convert video to a blob URL if it's a direct file link
        fetch(streamUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
            video.src = url;
          })
          .catch((err) => console.error("Error fetching video:", err));
      }
    }
  }, [stream, streamUrl]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback error:", err));
    }
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        controls={!isPlaying}
        className="messageVideo_live"
        onClick={handlePlay} // ✅ Require user interaction
      >
        Your browser does not support the video tag.
      </video>
      {!isPlaying && <p className="play-overlay">Click to Play</p>}
    </div>
  );
};

export default LiveStreamPlayer;
