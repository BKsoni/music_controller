import React, { useState } from 'react'
import { Grid, Button, Typography, Card, IconButton, LinearProgress } from '@mui/material'
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MusicPlayer = ({title,artist,duration,time,image_url,is_playing,votes,votes_required }) => {
    const songProgress = (time/duration)*100;

    const pauseSong = () => {
        console.log("pause");
        axios.put('/spotify/pause-song');
    }

    const playSong = () => {
        axios.put('/spotify/play-song');
    }

    const skipSong = () => {
        console.log("skip");
        axios.post('/spotify/skip-song');
    }

      return (
    <Card>
        <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
            <img src={image_url} height="100%" width="100%" />
            </Grid>
            <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
                {title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
                {artist}
            </Typography>
            <div>
                <IconButton onClick={is_playing ? pauseSong : playSong}>
                    {is_playing ? <Pause/> : <PlayArrow/>}
                </IconButton>
                {/* <IconButton>
                <SkipPrevious />
                </IconButton> */}
                <IconButton onClick={ () => skipSong()}>
                {votes}/{" "}{votes_required}<SkipNext />
                </IconButton>
            </div>
            </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  )
}

export default MusicPlayer;

// "title": "My Life Is Going On - Música Original De La Serie De TV La Casa De Papel / Money Heist",
// "artist": "Cecilia Krull",
// "duration": 214200,
// "time": 188633,
// "image_url": "https://i.scdn.co/image/ab67616d0000b2733e3a37a2c68382b4cabe981b",
// "is_playing": false,
// "votes": 0,
// "id": "5ZEQjTroORCu6uWvZrdeNc"