import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { baseURl } from "../services/apiUrls";
import type { IAudioPlayerProps } from "../types";
import { formatTime } from "../utils";
import { Pause, PlayArrow } from "@mui/icons-material";

function AudioPlayer(porps: IAudioPlayerProps) {
  const { data,theme } = porps;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" component="h2">
        Audio Preview
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="contained"
          onClick={togglePlayPause}
          startIcon={isPlaying ? <Pause /> : <PlayArrow />}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Box
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Typography variant="body2">{formatTime(currentTime)}</Typography>
          <LinearProgress
            variant="determinate"
            value={duration ? (currentTime / duration) * 100 : 0}
            sx={{ flexGrow: 1, height: 8 }}
          />
          <Typography variant="body2">{formatTime(duration)}</Typography>
        </Box>
      </Box>
      <audio
        ref={audioRef}
        src={`${baseURl}/${data?.url}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        hidden
      />
    </Paper>
  );
}

export default AudioPlayer;
