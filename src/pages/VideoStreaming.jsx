import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./videoStreaming.css";
import video from "../assets/video2.mp4";
import Footer from "../components/Footer";
import {
  FaMicrophone,
  FaVideo,
  FaMicrophoneSlash,
  FaVideoSlash,
} from "react-icons/fa";
import { connect, sendMsg } from "../app/ws";
import { user } from "../features/login/loginSlice";
import { store } from "../app/store";


const VideoStreaming = () => {
  const user_object = user(store.getState());
  console.log(user_object);
  console.log(store.getState())


  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  const toggleMic = () => {
    setMicActive(!micActive);
  };

  const toggleVideo = () => {
    setVideoActive(!videoActive);
  };

  useEffect(() => {
    console.log("Connecting to WS...", user_object);
    const newSocket = new WebSocket(
      `ws://0.0.0.0:8080/api/v1/connect-chat/${user_object.name}`
    );
    setSocket(newSocket);
    connect(newSocket, (msg) => {
      const text_json = JSON.parse(msg.data);

      console.log("New Message Arrived", text_json);
      const message = {
        sender: "Other",
        text: `${text_json.name}-${text_json.body}`,
      };
      setMessages((prevHistory) => [...prevHistory, message]);
    });

    // Cleanup function to close the WebSocket connection
    return () => {
      newSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = { sender: "You", text: newMessage };
    sendMsg(socket, newMessage);
    setNewMessage("");
    setMessages((prevHistory) => [...prevHistory, message]);
  };

  return (
    <>
      <Navbar />
      <div className="videostreaming__container">
        <div className="videostreaming__left__container">
          <h1 className="videostreaming__header">React Tutorial 1</h1>
          <div className="videostreaming__preview__container">
            <video autoPlay muted loop>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="videostreaming__icon__container">
            <button
              className={`round-button ${micActive ? "active" : ""}`}
              onClick={toggleMic}
            >
              {micActive ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <button
              className={`round-button ${videoActive ? "active" : ""}`}
              onClick={toggleVideo}
            >
              {videoActive ? <FaVideo /> : <FaVideoSlash />}
            </button>
            <button className="leave-button">Leave Class</button>
          </div>
        </div>
        <div className="videostreaming__right__container">
          <div className="chat-window">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  className={`message ${
                    message.sender === "You" ? "user-message" : "other-message"
                  }`}
                  key={index}
                >
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
        <div className="videostreaming__icon__container"></div>
      </div>
      <Footer />
    </>
  );
};

export default VideoStreaming;
