import { Icon } from "@iconify/react";
import { useState } from "react";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = async () => {
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // mediaRecorder = new MediaRecorder(stream);

    // mediaRecorder.ondataavailable = (event) => {
    //   audioChunks.push(event.data);
    // };

    // mediaRecorder.onstop = () => {
    //   const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    //   setAudioBlob(audioBlob);
    // };

    // mediaRecorder.start();
    // setRecording(true);
  };

  const stopRecording = () => {
    // mediaRecorder.stop();
    // setRecording(false);
  };

  const uploadRecording = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Recording uploaded successfully!");
    } else {
      alert("Failed to upload recording.");
    }
  };

  return (
    <div>
        <Icon icon="material-symbols:mic" width="24" height="24"  onClick={recording ? stopRecording : startRecording}/>
      {audioBlob && (
        <Icon icon="material-symbols:mic" width="24" height="24"  onClick={uploadRecording}/>
      )}
    </div>
  );
};

export default AudioRecorder;
