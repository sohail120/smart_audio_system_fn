// src/pages/ProcessingProgress.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Button,
  LinearProgress,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Face as FaceIcon,
  RecordVoiceOver as VoiceIcon,
  Language as LanguageIcon,
  Subtitles as SubtitlesIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProcessingProgress: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState<{ [key: number]: number }>({
    0: 0, // Speaker Identification
    1: 0, // Speaker Diarization
    2: 0, // Language Identification
    3: 0, // Speech Recognition
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // This would typically come from props or state management
  const audioFileUrl = "https://example.com/audio-file.mp3"; // Replace with your actual audio URL

  const steps = [
    {
      label: "Speaker Identification",
      icon: <FaceIcon />,
      description: "Identifying and matching speakers in your audio file",
    },
    {
      label: "Speaker Diarization",
      icon: <VoiceIcon />,
      description: "Segmenting audio by speaker boundaries",
    },
    {
      label: "Language Identification",
      icon: <LanguageIcon />,
      description: "Detecting languages in each segment",
    },
    {
      label: "Speech Recognition",
      icon: <SubtitlesIcon />,
      description: "Converting speech to text",
    },
  ];

  // Audio player ref
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Simulate processing progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = { ...prev };
        if (newProgress[activeStep] < 100) {
          newProgress[activeStep] += Math.floor(Math.random() * 10) + 5;
          if (newProgress[activeStep] > 100) newProgress[activeStep] = 100;
        } else if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeStep]);

  const handleBack = () => {
    navigate(-1);
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < activeStep) return "completed";
    if (stepIndex === activeStep)
      return progress[stepIndex] === 100 ? "completed" : "active";
    return "pending";
  };

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 3 }}>
        Back
      </Button>
      
    <br/>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Processing Your File
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We're analyzing your media file. This may take a few minutes depending
        on file size.
      </Typography>
  {/* Audio Player Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h6" component="h2">
          Audio Preview
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={togglePlayPause}
            startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {formatTime(currentTime)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={duration ? (currentTime / duration) * 100 : 0}
              sx={{ flexGrow: 1, height: 8 }}
            />
            <Typography variant="body2">
              {formatTime(duration)}
            </Typography>
          </Box>
        </Box>
        <audio
          ref={audioRef}
          src={audioFileUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          hidden
        />
      </Paper>
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 4, border: `1px solid ${theme.palette.divider}` }}
      >
        <Stepper
          orientation={isMobile ? "vertical" : "horizontal"}
          activeStep={activeStep}
        >
          {steps.map((step, index) => (
            <Step
              key={step.label}
              completed={getStepStatus(index) === "completed"}
            >
              <StepLabel
                icon={React.cloneElement(step.icon, {
                  color:
                    getStepStatus(index) === "completed"
                      ? "primary"
                      : index === activeStep
                      ? "primary"
                      : "disabled",
                })}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Box sx={{ mb: 6 }}>
        {steps.map((step, index) => (
          <Paper
            key={step.label}
            elevation={0}
            sx={{
              p: 3,
              mb: 2,
              border: `1px solid ${
                index === activeStep
                  ? theme.palette.primary.light
                  : theme.palette.divider
              }`,
              backgroundColor:
                index === activeStep
                  ? theme.palette.action.hover
                  : "background.paper",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {React.cloneElement(step.icon, {
                  color:
                    getStepStatus(index) === "completed"
                      ? "primary"
                      : index === activeStep
                      ? "primary"
                      : "action",
                })}
                {step.label}
              </Typography>
              {getStepStatus(index) === "completed" ? (
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Completed"
                  color="success"
                  size="small"
                />
              ) : (
                <Chip
                  label={
                    index === activeStep ? `${progress[index]}%` : "Pending"
                  }
                  color={index === activeStep ? "primary" : "default"}
                  size="small"
                />
              )}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {step.description}
            </Typography>

            {index === activeStep && (
              <LinearProgress
                variant="determinate"
                value={progress[index]}
                sx={{ height: 8, borderRadius: 4 }}
              />
            )}
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          disabled={
            activeStep < steps.length - 1 || progress[steps.length - 1] < 100
          }
          sx={{ px: 4, py: 1.5 }}
          onClick={() => navigate("/results")} // Update with your results route
        >
          View Results
        </Button>
      </Box>
    </Container>
  );
};

export default ProcessingProgress;