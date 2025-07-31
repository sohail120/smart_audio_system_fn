import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useFetchResultById from "../hook/useFetchResultById";
import { useParams } from "react-router-dom";

// Define TypeScript interfaces

// Format time from milliseconds to MM:SS
const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Create a theme
const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const ResultsPage: React.FC = () => {
  const { id } = useParams();
  const { data } = useFetchResultById(id||""); // Assuming usefetchResults is a custom hook that fetches the transcription data
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 3,
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Transcription Results
            </Typography>
            <Chip
              label={`${data?.totalSpeakers} speakers`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: "bold" }}
            />
          </Box>

          <Typography variant="body2" color="textSecondary">
            Session ID: {data?.id}
          </Typography>
        </Paper>

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {data?.segment.map((segment, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        segment.speaker === "SPEAKER_00"
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                    }}
                  >
                    {segment.speaker.slice(-1)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {segment.speaker}
                      </Typography>
                      <Chip
                        label={`${formatTime(segment.start)} - ${formatTime(
                          segment.end
                        )}`}
                        size="small"
                        sx={{ ml: 1.5 }}
                      />
                      <Chip
                        label={segment.language.toUpperCase()}
                        size="small"
                        color="info"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                        {segment.transcript || <i>No transcript available</i>}
                      </Typography>
                      {segment.tranlate && segment.tranlate !== "q" && (
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, mt: 1, backgroundColor: "#f8fdff" }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            <b>Translation:</b> {segment.tranlate}
                          </Typography>
                        </Paper>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {index < data.segment.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default ResultsPage;
