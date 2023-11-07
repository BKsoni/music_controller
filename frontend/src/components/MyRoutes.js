import React from "react";
import RoomJoinPage from "./RoomJoinPage";
import RoomCreateOrUpdatePage from "./RoomCreateOrUpdatePage";
import HomePage from "./HomePage";
import Room from "./Room";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<RoomCreateOrUpdatePage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
