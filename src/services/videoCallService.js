import Axios from "axios";

export function createSession(host, title, password) {
  return Axios.post(
    `http://localhost:8080/api/v1/video-call/session`,
    JSON.stringify({
      title,
      host,
      password,
    })
  );
}

export function connectSession(host, password, socket) {
  return Axios.post(
    `http://localhost:8080/api/v1/video-call/connect/${socket}`,
    JSON.stringify({
      host,
      password,
    })
  );
}

export function verifySocket(url) {
  return Axios.get(`http://localhost:8080/api/v1/video-call/connect`, {
    params: {
      url,
    },
  });
}

export class ConnectionSocket {
  constructor(url) {
    this.connection = new WebSocket(url);
  }

  /**
   * Disconnect
   */
  disconnect() {
    this.connection.close();
  }

  /**
   * On open connection event.
   * @param callback handles on connection ready.
   */
  onOpen(callback) {
    this.connection.onopen = callback;
  }

  /**
   * Sends message through web sockets.
   * @param data data to send
   * @param type event type
   * @param userID user id
   * @param offer RTC offer
   */
  send(type, userID) {
    this.connection.send(
      JSON.stringify({
        type,
        userID,
      })
    );
  }

  sendDescription(type, description, userID, to) {
    this.connection.send(
      JSON.stringify({
        type,
        userID,
        description: JSON.stringify(description),
        to,
      })
    );
  }

  candidate(candidate, userID) {
    this.connection.send(
      JSON.stringify({
        candidate: JSON.stringify(candidate),
        userID,
        type: "ice",
      })
    );
  }

  /**
   * On message received.
   * @param callback method to handle on message function.
   */
  onMessage(callback) {
    this.connection.onmessage = callback;
  }

  /**
   * Checks if connection is ready.
   */
  isReady() {
    return this.connection.readyState === this.connection.OPEN;
  }
}

export const STUN_SERVERS = {
  iceServers: [
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

export class EasyRTC {
  constructor(servers, stream) {
    this.servers = servers;
    this.stream = stream;

    this.peerConnection = new RTCPeerConnection(servers);

    this.stream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track);
    });
  }

  /**
   * Creates offer to send to remote peers.
   */
  async createOffer() {
    let sessionDescription;
    sessionDescription = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(sessionDescription);

    return sessionDescription;
  }

  /**
   * Creates answer when offer is received.
   */
  async createAnswer() {
    let sessionDescription;
    sessionDescription = await this.peerConnection.createAnswer();
    this.peerConnection.setLocalDescription(sessionDescription);

    return sessionDescription;
  }

  /**
   * Receives answer from remote peers.
   */
  async receiveAnswer(event) {
    if (event) {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(event)
      );
    }
  }

  /**
   *
   * @param candidate
   */
  async addCandidate(candidate) {
    await this.peerConnection.addIceCandidate(candidate);
  }

  onTrack(callback) {
    this.peerConnection.ontrack = callback;
  }

  onIceCandidate(callback) {
    this.peerConnection.onicecandidate = callback;
  }

  async setRemoteDescription(description) {
    await this.peerConnection.setRemoteDescription(description);
  }

  addIceCandidate(candidate) {
    this.peerConnection.addIceCandidate(candidate);
  }

  disconnect() {
    this.peerConnection.close();
  }
}

export function byteToHex(byte) {
  return ("0" + byte.toString(16)).slice(-2);
}

export function generateId(len = 40) {
  var arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, byteToHex).join("");
}

export let State;
(function (State) {
  State[(State["VALID_URL"] = 1)] = "VALID_URL";
  State[(State["INVALID"] = 2)] = "INVALID";
  State[(State["LOGGED"] = 3)] = "LOGGED";
  State[(State["JOINED"] = 4)] = "JOINED";
})(State || (State = {}));
