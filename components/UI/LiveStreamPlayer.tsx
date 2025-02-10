import React, { useEffect, useRef, useState } from "react";

interface LiveStreamPlayerProps {
  streamUrl: string; // Accepts blob URL
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track if video is playing

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    video.src = streamUrl;
    video.load();

    // Try autoplaying, if it fails, show play button
    video.play()
      .then(() => setIsPlaying(true)) // Success
      .catch((err) => {
        console.warn("Autoplay failed, user interaction required:", err);
        setIsPlaying(false); // Show play button
      });
  }, [streamUrl]);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative">
      <video ref={videoRef} controls autoPlay className="w-full h-auto" />
      
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold"
        >
          ▶ Click to Play
        </button>
      )}
    </div>
  );
};

export default LiveStreamPlayer;
