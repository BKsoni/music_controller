import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
  Collapse,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const RoomCreateOrUpdatePage = ({ type, roomCode, defaultGuestCanPause=true, defaultVotes=2, updateCallback }) => {

  const [guestCanPause, setGuestCanPause] = useState(defaultGuestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleCreateRoomButtonPressed = () => {
    const data = {
      votes_to_skip: votesToSkip,
      guest_can_pause: guestCanPause,
    };
    axios
      .post("/api/create-room", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMsg("Room created successfully!");
        navigate(`/room/${response.data.code}`);
      })
      .catch((error) => {
        setErrorMsg("An error occurred. Please try again.");
        console.error("An error occurred:", error);
      });

  };

  const handleUpdateRoomButtonPressed = () => {
    const data = {
      votes_to_skip: votesToSkip,
      guest_can_pause: guestCanPause,
      code: roomCode,
    };
    axios
      .patch("/api/update-room", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMsg("Room updated successfully!");
        navigate(`/room/${response.data.code}`);
        updateCallback();
      })
      .catch((error) => {
        setErrorMsg("An error occurred. Please try again.");
        console.error("An error occurred:", error);
      });

  };

  const renderCreateRoom = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateRoomButtonPressed}
          >
            Create Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateRoom = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdateRoomButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
      </Grid>
    );
  }

  const title = type === "update" ? "Update Room" : "Create a Room";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" va riant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Collapse in={successMsg !== "" || errorMsg !== ""}>
          {successMsg !== "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setSuccessMsg("");
              }}
            >
              {successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMsg("");
              }}
            >
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          required={true}
          type="number"
          defaultValue={defaultVotes}
          inputProps={{
            min: 1,
            style: { textAlign: "center" },
          }}
          onChange={handleVotesChange}
        />
        <FormHelperText>
          <div align="center">Votes Required to Skip Song</div>
        </FormHelperText>
      </Grid>
      {type === "update" ? renderUpdateRoom() : renderCreateRoom()}
    </Grid>
  );
};

export default RoomCreateOrUpdatePage;
