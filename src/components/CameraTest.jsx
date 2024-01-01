import React, { useState, useEffect, useRef } from 'react';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import './cameratest.css'

const CameraTest = () => {
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const cameraStreamRef = useRef();

  useEffect(() => {
    // When cameraStream updates, set srcObject if the video element is available
    if (cameraStream && cameraStreamRef.current) {
      cameraStreamRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const toggleCamera = async () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
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

  return (
    <div className="camera-test-container">
      {cameraStream && (
        <video
          ref={cameraStreamRef}
          autoPlay
          muted
          style={{ width: '100%', maxWidth: '400px', transform: 'scaleX(-1)' }}
        ></video>
      )}

      <button
        className={`camera__button ${cameraActive ? 'active' : ''}`}
        onClick={toggleCamera}
      >
        {cameraActive ? <FaVideo /> : <FaVideoSlash />}
      </button>
    </div>
  );
};

export default CameraTest;
