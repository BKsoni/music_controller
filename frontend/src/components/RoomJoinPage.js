import React, { Component, useState } from 'react'
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RoomJoinPage = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleTextFieldChange = (event) => {
    setRoomCode(event.target.value);
  };

  const handleJoinButtonClick = () => {
    axios
      .post("/api/join-room", { code: roomCode })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/room/${roomCode}`);
        } else {
          setError("Room not found.");
        }
      })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" va riant="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <TextField
          error={error}
          helperText={error}
          label="Code"
          placeholder="Enter a Room Code"
          variant='outlined'
          value={roomCode}
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={handleJoinButtonClick}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
      </Grid>
  )
}

export default RoomJoinPage