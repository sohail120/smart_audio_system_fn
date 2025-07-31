// src/pages/ProcessingProgress.tsx
import React from "react";
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  LinearProgress,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Face as FaceIcon,
  RecordVoiceOver as VoiceIcon,
  Language as LanguageIcon,
  Subtitles as SubtitlesIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  Translate,
  Refresh,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import useFetchFilesById from "../hook/useFetchFilesById";
import AudioPlayer from "../components/AudioPlayer";
import { STATUS_MAPPING } from "../types";
import { changeFileStatuts } from "../services/files.service";
import { appRoutes } from "../routing/appRoutes";

// Simplified step status type
type StepStatus = "pending" | "start" | "progress" | "done";

const ProcessingProgress: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { data, refetch } = useFetchFilesById(id || "");

  const steps = [
    {
      label: "Speaker Identification",
      icon: <FaceIcon />,
      description: "Identifying and matching speakers in your audio file",
      startStatus: STATUS_MAPPING.upload,
      progressStatus: STATUS_MAPPING.processing_speaker_identification,
      doneStatus: STATUS_MAPPING.done_speaker_identification,
    },
    {
      label: "Speaker Diarization",
      icon: <VoiceIcon />,
      description: "Segmenting audio by speaker boundaries",
      startStatus: STATUS_MAPPING.done_speaker_identification,
      progressStatus: STATUS_MAPPING.processing_speaker_diarization,
      doneStatus: STATUS_MAPPING.done_speaker_diarization,
    },
    {
      label: "Speech Recognition",
      icon: <SubtitlesIcon />,
      description: "Converting speech to text",
      startStatus: STATUS_MAPPING.done_speaker_diarization,
      progressStatus: STATUS_MAPPING.processing_speech_recognition,
      doneStatus: STATUS_MAPPING.done_speech_recognition,
    },

    {
      label: "Language Identification",
      icon: <LanguageIcon />,
      description: "Detecting languages in each segment",
      startStatus: STATUS_MAPPING.done_speech_recognition,
      progressStatus: STATUS_MAPPING.processing_language_identification,
      doneStatus: STATUS_MAPPING.done_language_identification,
    },

    {
      label: "Neural Translation",
      icon: <Translate />, // You'll need to import this icon
      description:
        "Translate transcribed text to English with speaker segmentation.",
      startStatus: STATUS_MAPPING.done_language_identification,
      progressStatus: STATUS_MAPPING.processing_neural_translation,
      doneStatus: STATUS_MAPPING.done_neural_translation,
    },
  ];

  // Get current status as a number
  const currentStatus = data?.status
    ? Number(data.status)
    : STATUS_MAPPING.upload;

  // Determine the status of each step
  const getStepStatus = (index: number): StepStatus => {
    const step = steps[index];

    if (currentStatus >= step.doneStatus) {
      return "done";
    }

    if (currentStatus === step.progressStatus) {
      return "progress";
    }

    if (currentStatus === step.startStatus) {
      return "start";
    }

    return "pending";
  };

  // Get active step (for stepper)
  const getActiveStep = () => {
    for (let i = 0; i < steps.length; i++) {
      const status = getStepStatus(i);
      if (status === "progress" || status === "start") return i;
      if (status === "pending") return i;
    }
    return steps.length;
  };

  const activeStep = getActiveStep();

  const handleStartStep = async (status: string) => {
    console.log("Starting step with status:", status);
    await changeFileStatuts(status, data?.id || "");
    refetch();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 6 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 3 }}>
        Back
      </Button>

      <br />

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
        Processing Your File ({data?.name || ""})
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We're analyzing your media file. This may take a few minutes depending
        on file size.
      </Typography>

      {/* Audio Player Section */}
      <AudioPlayer data={data} theme={theme} />

      <Paper
        elevation={0}
        sx={{ p: 3, mb: 4, border: `1px solid ${theme.palette.divider}` }}
      >
        <Stepper
          orientation={isMobile ? "vertical" : "horizontal"}
          activeStep={activeStep}
        >
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <Step key={step.label} completed={status === "done"}>
                <StepLabel
                  icon={React.cloneElement(step.icon, {
                    color:
                      status === "done"
                        ? "primary"
                        : index === activeStep
                        ? "primary"
                        : "disabled",
                  })}
                >
                  {step.label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Paper>

      <Box sx={{ mb: 6 }}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <Paper
              key={step.label}
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                border: `1px solid ${
                  status === "progress" || status === "start"
                    ? theme.palette.primary.light
                    : theme.palette.divider
                }`,
                backgroundColor:
                  status === "progress" || status === "start"
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
                      status === "done"
                        ? "primary"
                        : status === "progress" || status === "start"
                        ? "primary"
                        : "action",
                  })}
                  {step.label}
                </Typography>
                {status === "done" ? (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Completed"
                    color="success"
                    size="small"
                  />
                ) : status === "progress" ? (
                  <Chip label="In Progress" color="primary" size="small" />
                ) : status === "start" ? (
                  <Chip label="Ready to Start" color="info" size="small" />
                ) : (
                  <Chip label="Pending" color="default" size="small" />
                )}
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {step.description}
              </Typography>
              {status === "progress" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LinearProgress
                    sx={{ height: 8, borderRadius: 4, width: "98%" }}
                  />
                  <IconButton onClick={refetch}>
                    <Refresh />
                  </IconButton>
                </Box>
              )}

              {status === "start" && (
                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleStartStep(data?.status || "")}
                  sx={{ mt: 2 }}
                >
                  Start {step.label}
                </Button>
              )}
            </Paper>
          );
        })}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          // disabled={currentStatus !== STATUS_MAPPING.done_neural_translation}
          sx={{ px: 4, py: 1.5 }}
          onClick={() => navigate(`${appRoutes.result}/${data?.id}`)}
        >
          View Results
        </Button>
      </Box>
    </Container>
  );
};

export default ProcessingProgress;
