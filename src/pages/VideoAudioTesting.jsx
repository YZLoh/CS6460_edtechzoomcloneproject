import React, { useState, useRef, useEffect } from 'react';
import { FaVideo, FaMicrophone, FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './videoAudioTesting.css';
import { Link } from 'react-router-dom';

const VideoAudioTesting = () => {
  const [cameraStream, setCameraStream] = useState(null);
  const [micStream, setMicStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const cameraStreamRef = useRef();

  useEffect(() => {
    // When cameraStream updates, set srcObject if the video element is available
    if (cameraStream && cameraStreamRef.current) {
      cameraStreamRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const handlePageUnload = () => {
    stopCamera(); // Stop camera when the page is about to unload
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Tab switched or page hidden, stop camera and microphone
      if (cameraActive) {
        console.log('Page is unloading 1')
        stopCamera();
      }
      if (micActive) {
        console.log('Page is unloading 2')
        stopMicrophone();
      }
    }
  };

  const toggleCamera = async () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const toggleMicrophone = async () => {
    if (micActive) {
      stopMicrophone();
    } else {
      startMicrophone();
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
      cameraStreamRef.current.srcObject = null;
      setCameraStream(null);
      setCameraActive(false);
    }
  };

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      setMicActive(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopMicrophone = () => {
    if (micStream) {
      const tracks = micStream.getTracks();
      tracks.forEach((track) => track.stop());
      setMicStream(null);
      setMicActive(false);
    }
  };

  useEffect(() => {
    // Add event listeners to handle page unload and tab switch
    window.addEventListener('beforeunload', handlePageUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="testingvideo__container">
        <div className="testingvideo__left__container">
          <div className="testingvideo__title__container">
            <h1 className="testingvideo__title">Getting Started</h1>
            <p className="testingvideo__text">Setup your audio and video before joining</p>
          </div>
        </div>

        <div className="testing__video__right__container">
          <div className="testing__video__container">
            {cameraStream && (
              <video
                ref={cameraStreamRef}
                autoPlay
                muted
                style={{ width: '100%', maxWidth: '450px', transform: 'scaleX(-1)'}}
              ></video>
            )}

            <div className="icon__container">
            <button className={`round-button ${cameraActive ? 'active' : ''}`} onClick={toggleCamera}>
                {cameraActive ? <FaVideo /> : <FaVideoSlash />}
            </button>
            <button className={`round-button ${micActive ? 'active' : ''}`} onClick={toggleMicrophone}>
                {micActive ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            </div>
          </div>
          <Link to="/stream-dev">
            <button className="testing__join__button">Join Meeting</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoAudioTesting;
