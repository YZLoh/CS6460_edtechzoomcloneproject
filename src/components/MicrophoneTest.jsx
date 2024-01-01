import React,{useState} from 'react'
import './microphonetest.css'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const MicrophoneTest = () => {
  // State for managing microphone and audio level
  const [isMicOn, setIsMicOn] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [mediaStream, setMediaStream] = useState(null);

  // Function to toggle the microphone on/off
  const toggleMic = () => {
    if (isMicOn) {
      // Turn off the microphone
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      setMediaStream(null);
      setIsMicOn(false);
      setAudioLevel(0);
    } else {
      // Turn on the microphone
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setMediaStream(stream);
          setIsMicOn(true);

          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);

          microphone.connect(analyser);
          analyser.connect(audioContext.destination);

          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateAudioLevel = () => {
            analyser.getByteFrequencyData(dataArray);
            const sum = dataArray.reduce((acc, value) => acc + value, 0);
            const averageLevel = sum / bufferLength;
            setAudioLevel(averageLevel);
            requestAnimationFrame(updateAudioLevel);
          };

          updateAudioLevel();
        })
        .catch((error) => {
          console.error('Error accessing the microphone:', error);
        });
    }
  };

  return (
    <div className="microphone-test-container">
      <button className={`microphone-button ${isMicOn ? 'active' : ''}`} onClick={toggleMic}>
        {isMicOn ? (
          <>
            <FaMicrophone className="microphone-icon" />
          </>
        ) : (
          <>
            <FaMicrophoneSlash className="microphone-icon" />
          </>
        )}
      </button>
      <div className="audio-level-bar">
        <div className="audio-level" style={{ width: `${audioLevel}%` }}></div>
      </div>
    </div>
  );
};

export default MicrophoneTest;
