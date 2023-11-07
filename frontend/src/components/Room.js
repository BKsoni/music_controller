import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import RoomCreateOrUpdatePage from "./RoomCreateOrUpdatePage";
import MusicPlayer from "./MusicPlayer";

function Room() {
  const { roomCode } = useParams();
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
    spotifyAuthenticated: false,
    song: {},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentSong();
    }, 1000);
    return () => clearInterval(interval);
  }, roomDetails);

  useEffect(() => {
    getRoomDetails();
  }, roomCode);

  const getRoomDetails = async () => {
    try {
      const response = await axios.get("/api/get-room" + "?code=" + roomCode);
      if (response.status !== 200) {
        handleLeaveButtonPressed();
      }
      setRoomDetails({
        votesToSkip: response.data.votes_to_skip,
        guestCanPause: response.data.guest_can_pause,
        isHost: response.data.is_host,
      });
      if (response.data.is_host) {
        authenticateSpotify();
        getCurrentSong();
      }
      console.log(roomDetails);
    } catch (error) {
      handleLeaveButtonPressed();
      console.error(error);
    }
  };

  const authenticateSpotify = () => {
    axios.get("/spotify/is-authenticated").then((response) => {
      setRoomDetails((prevRoomDetails) => ({
        ...prevRoomDetails,
        spotifyAuthenticated: response.data.status,
      }));

      if (!response.data.status) {
        axios
          .get("/spotify/get-auth-url")
          .then((response) => {
            window.location.replace(response.data.url);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const getCurrentSong = () => {
    axios
      .get("/spotify/current-song")
      .then((response) => {
        setRoomDetails((prevRoomDetails) => ({
          ...prevRoomDetails,
          song: response.data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLeaveButtonPressed = () => {
    axios
      .post("/api/leave-room")
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {});
  };

  const updateShowSettings = (value) => {
    setRoomDetails({
      ...roomDetails,
      showSettings: value,
    });
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Settings
          </Typography>
        </Grid>
        <RoomCreateOrUpdatePage
          type="update"
          roomCode={roomCode}
          defaultGuestCanPause={roomDetails.guestCanPause}
          defaultVotes={roomDetails.votesToSkip}
          updateCallback={getRoomDetails}
        />
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };
  if (roomDetails.showSettings) return renderSettings();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" compact="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        {roomDetails.song ? (
          <MusicPlayer {...roomDetails.song} />
        ) : (
          <Typography variant="h6" compact="h6">
            No song currently playing
          </Typography>
        )}

      </Grid>
      {roomDetails.isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLeaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
export default Room;
