import React,{useState,useRef} from 'react'
import Navbar from '../components/Navbar'
import './recordingStream.css'
import video from '../assets/video2.mp4'
import Footer from '../components/Footer'
import { FaMicrophone, FaVideo, FaMicrophoneSlash, FaVideoSlash } from 'react-icons/fa';;

const RecordingStreaming = () => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  const toggleMic = () => {
    setMicActive(!micActive);
  };

  const toggleVideo = () => {
    setVideoActive(!videoActive);
  };

  

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const updatedMessages = [...messages, { text: newMessage, sender: 'You' }];
    setMessages(updatedMessages);
    setNewMessage('');
  };


  return (
    <>
        <Navbar />
        <div className="recordingtreaming__container">
            <div className="recordingtreaming__left__container">
                <h1 className="recordingtreaming__header">React Tutorial 1</h1>
                <div className="recordingtreaming__preview__container">
                    <video autoPlay muted loop>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="recordingtreaming__icon__container">
                    <button
                    className={`round-button ${micActive ? 'active' : ''}`}
                    onClick={toggleMic}
                    >
                    {micActive ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    </button>
                    <button
                        className={`round-button ${videoActive ? 'active' : ''}`}
                        onClick={toggleVideo}
                    >
                        {videoActive ? <FaVideo /> : <FaVideoSlash />}
                    </button>
                    <button className="download-button stream-button">
                        Download transcript
                    </button>
                    <button className="leave-button stream-button">
                        Leave Class
                    </button>
                </div>
                
            </div>
            <div className="recordingtreaming__right__container">
            <div className="chat-window">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                    <div className={`message ${message.sender === 'You' ? 'user-message' : 'other-message'}`} key={index}>
                        {message.text}
                    </div>
                    ))}
                </div>
                <div className="message-input">
                    <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
            </div>
                <div className="recordingtreaming__icon__container">

                </div>
            </div>
        <Footer />
    </>
  )
}

export default RecordingStreaming
