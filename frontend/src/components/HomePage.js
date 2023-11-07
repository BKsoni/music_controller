import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code) {
            navigate(`/room/${data.code}`);
        }
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" to="/join" href="/join">
          Join a Room
        </Button>
        <Button
          variant="contained"
          color="secondary"
          to="/create"
          href="/create"
        >
          Create a Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomePage;
