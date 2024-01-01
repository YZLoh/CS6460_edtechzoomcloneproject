import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import Recordings from "./pages/Recordings";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";
import VideoAudioTesting from "./pages/VideoAudioTesting";
import Settings from "./pages/Settings";
import Terms from "./pages/Terms";
import VideoStreaming from "./pages/VideoStreaming";
import RecordingStreaming from "./pages/RecordingStream";
import RequireAuth from "./components/RequireAuth";
import { Home } from "./pages/meet-home";
import { Meeting } from "./pages/meet-meeting";
import DownloadTranscript from "./pages/DownloadTranscript";
import StreamDev from "./pages/StreamDev";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Allow access to the Login component without authentication */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes for all users */}
        <Route path="/create-meeting" element={<Home />} />
        <Route path="/meeting/*" element={<Meeting />} />
        <Route exact path="/" element={<Schedule />} />
        <Route path="recordings">
          <Route index element={<Recordings />} />
          <Route path="term" element={<Terms />} />
          <Route path="stream" element={<RecordingStreaming />} />
        </Route>
        <Route path="classes">
          <Route index element={<Classes />} />
          <Route path="testing" element={<VideoAudioTesting />} />
          <Route path="stream" element={<VideoStreaming />} />
          <Route path="download-transcript" element={<DownloadTranscript />} />
        </Route>
        <Route path="stream-dev" element={<StreamDev />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Redirect to home for any other paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
