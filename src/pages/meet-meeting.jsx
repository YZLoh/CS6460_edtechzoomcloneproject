/* eslint-disable default-case */
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  verifySocket,
  connectSession,
  EasyRTC,
  ConnectionSocket,
  generateId,
  STUN_SERVERS,
  State
} from "../services/videoCallService";
import logo from "../assets/images/logo.svg";
import micOn from "../assets/images/mic-on.svg";
import micOff from "../assets/images/mic-off.svg";
import camOn from "../assets/images/cam-on.svg";
import camOff from "../assets/images/cam-off.svg";
import view from "../assets/images/view.svg";
import { SessionCredentials } from "./session-modal";
import "./meet-meeting.css";
import { useBeforeunload } from "react-beforeunload";
import Navbar from "../components/Navbar"

export const Meeting = () => {
  const location = useLocation();
  const [state, setState] = useState(State.INVALID);
  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState();
  const [video, setVideo] = useState();
  const [viewMode, setViewMode] = useState(false);
  const [connection, setConnection] = useState();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState("");
  const [url] = useState(location.pathname.split("/meeting/")[1]);
  const [localStream, setLocalStream] = useState();
  const localVideo = useRef(null);
  const userId = useRef(generateId());

  useBeforeunload((event) => {
    event.preventDefault();
    if (connection) {
      connection.send("disconnect", userId.current);
    }
  });

  useEffect(() => {
    let unmounted = false;
    const getValidity = async () => {
      try {
        await verifySocket(url);
        if (!unmounted) {
          setState(State.VALID_URL);
        }
      } catch (error) {
        console.log(error.message);
        console.error("Invalid URL");
        window.location.href = "/";
      }
    };
    getValidity();
    return () => {
      unmounted = true;
    };
  }, [url]);

  const connect = (host, password) => {
    connectSession(host, password, url)
      .then((response) => {
        if (response.data.title) {
          setTitle(response.data.title);
        }

        if (response.data.socket) {
          setSocket(response.data.socket);
        }

        setState(State.LOGGED);
      })
      .catch((error) => {
        setState(State.INVALID);
      });
  };

  const joinMeeting = () => {
    switch (state) {
      case State.LOGGED:
        setState(State.JOINED);
        break;
      case State.JOINED:
        setState(State.LOGGED);
        break;
    }
  };

  useEffect(() => {
    console.log(state);
    if (state >= 3) {
      if (localVideo.current && !localVideo.current.srcObject) {
        navigator.mediaDevices.getUserMedia(
          { audio: true, video: true }
        ).then(stream => {
          console.log(stream, 121312);
          stream.getTracks().forEach((track) => {
            if (track.kind === "audio" || track.kind === "video") {
              track.enabled = true;
              console.log(track);
            }
          });

          console.log(stream.getTracks(), 121312);
          if (localVideo.current) {
            localVideo.current.srcObject = stream;
          }
          setLocalStream(stream);

          setAudio(true);
          setVideo(true);
        }).catch(error => {
          console.log(error);
        });
      }
    }

  }, [state]);


  // useEffect(() => {
  //   if (localStream) {
  //     const media = localStream;
  //     media.getTracks().forEach((track) => {
  //       if (track.kind === "audio") {
  //         track.enabled = !track.enabled;
  //       }
  //     });
  //   }
  // }, [localStream, audio]);

  // useEffect(() => {
  //   if (localStream) {
  //     const media = localStream;
  //     media.getTracks().forEach((track) => {
  //       if (track.kind === "video") {
  //         track.enabled = !track.enabled;
  //       }
  //     });
  //   }
  // }, [localStream, video]);

  useEffect(() => {
    if (state === 3 && connection) {
      connection.send("disconnect", userId.current);
      setUsers([]);
    }
  }, [state, connection]);

  useEffect(() => {
    if (state > 3) {
      const socketConnection = new ConnectionSocket(
        `ws://192.168.0.11:8080/api/v1/video-call/ws/${socket}`
      );
      const remoteStreams = [];
      const rtcPeerConnection = [];

      const onConnectionReady = () => {
        socketConnection.send("connect", userId.current);
      };

      const onMessage = (event) => {
        const data = JSON.parse(event.data);

        if (!rtcPeerConnection[data.userID] && userId.current !== data.userID) {
          if (!remoteStreams[data.userID]) {
            remoteStreams[data.userID] = new MediaStream();
          }

          if (localVideo.current && localVideo.current.srcObject) {
            rtcPeerConnection[data.userID] = new EasyRTC(
              STUN_SERVERS,
              localVideo.current.srcObject
            );
            console.log(`RTC connection established with user ${data.userID}`); // Added console log
          }

          rtcPeerConnection[data.userID].onIceCandidate((event) => {
            if (event.candidate) {
              socketConnection.candidate(event.candidate, userId.current);
            }
          });

          rtcPeerConnection[data.userID].onTrack((event) => {
            const mediaStream = remoteStreams[data.userID];
            mediaStream.addTrack(event.track);
            console.log(`Video track added for user ${data.userID}`); // Added console log

            const element = document.getElementById(`${data.userID}-video`);
            // const element = document.getElementById(`${data.userID}-video`);
            if (element) {
              element.srcObject = mediaStream;
              console.log(`Media stream assigned to video element for user ${data.userID}`); // Added console log
              element.onplaying = () => {
                console.log(`Video stream is playing for user ${data.userID}`); // Added console log
              };

            } else {
              console.log(`Video element not found for user ${data.userID}`); // Added console log
            }
            // element.srcObject = mediaStream;
          });
        }

        switch (data.type) {
          case "session_joined":
            socketConnection.send("start_call", userId.current);
            break;
          case "start_call":
            if (data.userID !== userId.current) {
              setUsers((prevState) =>
                prevState.indexOf(data.userID) < 0
                  ? prevState.concat(data.userID)
                  : prevState
              );
              rtcPeerConnection[data.userID]
                .createOffer()
                .then((description) => {
                  socketConnection.sendDescription(
                    "offer",
                    description,
                    userId.current,
                    data.userID
                  );
                });
            }
            break;
          case "offer":
            if (data.to === userId.current) {
              setUsers((prevState) =>
                prevState.indexOf(data.userID) < 0
                  ? prevState.concat(data.userID)
                  : prevState
              );
              rtcPeerConnection[data.userID]
                .setRemoteDescription(
                  new RTCSessionDescription(JSON.parse(data.description))
                )
                .then(async () => {
                  const answer = await rtcPeerConnection[
                    data.userID
                  ].createAnswer();
                  socketConnection.sendDescription(
                    "answer",
                    answer,
                    userId.current,
                    data.userID
                  );
                });
            }
            break;
          case "answer":
            if (data.to === userId.current) {
              rtcPeerConnection[data.userID].receiveAnswer(
                JSON.parse(data.description)
              );
            }
            break;
          case "ice":
            if (userId.current !== data.userID && data.candidate) {
              rtcPeerConnection[data.userID].addIceCandidate(
                JSON.parse(data.candidate)
              );
            }
            break;
          case "disconnect":
            if (data.userID !== userId.current) {
              setUsers((prevItems) => {
                const users = [...prevItems];
                users.splice(users.indexOf(data.userID), 1);
                return users;
              });
              remoteStreams[data.userID] = undefined;
              rtcPeerConnection[data.userID] = undefined;
            }
            break;
        }
      };

      socketConnection.onOpen(onConnectionReady);
      socketConnection.onMessage(onMessage);
      setConnection(socketConnection);
    }
  }, [state, socket]);

  return (

    <div className="meeting">
    <Navbar />

      <div className="meeting__header">
        <div className="meeting__header__left">
          <img src={logo} alt="Logo" className="meeting__header__left__logo" />
          <span className="meeting__header__left__text">MeetJS</span>
        </div>
        <div className="meeting__header__right">
          <a
            href="https://github.com/thealmarques/meetjs-webrtc-golang"
            className="meeting__header__right__margin"
          >
            Github
          </a>
        </div>
      </div>
      <div className="meeting__body">
        {state <= 2 && (
          <SessionCredentials
            error={state === State.INVALID}
            connect={connect}
          ></SessionCredentials>
        )}
        {state === State.LOGGED && (
          <div className="meeting__body__info">
            Join the meeting to communicate with others.
          </div>
        )}
        {state === State.JOINED && (
          <div
            className={`meeting__body__users ${
              viewMode
                ? "meeting__body__users-row"
                : "meeting__body__users-column"
            }`}
          >
            {users.map((user, index) => {
              return (
                <video
                  key={index}
                  id={`${user}-video`}
                  autoPlay
                  className={`meeting__body__users__remote-video ${
                    viewMode ? "meeting__body__users__remote-video-split" : ""
                  }`}
                ></video>
              );
            })}
          </div>
        )}
        {state > 2 && (
          <div className="meeting__body__bar">
            <div className="meeting__body__bar__video-container">
              <video
                hidden={!video}
                ref={localVideo}
                autoPlay
                muted
                className="meeting__body__bar__video-container__local-video"
                id="local-video"
              ></video>
            </div>
            <div className="meeting__body__bar__left-bar">
              <div
                onClick={joinMeeting}
                className={`meeting__body__bar__left-bar__status ${
                  state === State.JOINED
                    ? "meeting__body__bar__left-bar__status-inactive"
                    : "meeting__body__bar__left-bar__status-active"
                }`}
              >
                {state === State.JOINED ? "Leave" : "Join"}
              </div>
              <span className="meeting__body__bar__left-bar__title">
                {title}
              </span>
            </div>
            <div className="meeting__body__bar__right-bar">
              {state === State.JOINED && (
                <span className="meeting__body__bar__right-bar__count">
                  {users.length} online users
                </span>
              )}
              <img
                className="meeting__body__bar__right-bar__icon"
                src={view}
                alt="Change view"
                onClick={() => setViewMode(!viewMode)}
              />
              <img
                className="meeting__body__bar__right-bar__icon"
                src={audio ? micOn : micOff}
                alt="Mic"
                onClick={() => setAudio(!audio)}
              />
              <img
                className="meeting__body__bar__right-bar__icon"
                src={video ? camOn : camOff}
                alt="Webcam"
                onClick={() => setVideo(!video)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
