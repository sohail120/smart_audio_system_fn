// src/pages/Home.tsx
import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  RecordVoiceOver as SpeakerIcon,
  Translate as TranslateIcon,
  Subtitles as SubtitlesIcon,
  Language as LanguageIcon,
  Face as FaceIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../routing/appRoutes";

interface GradientTextProps {
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({ children }) => (
  <Typography
    component="span"
    sx={{
      background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline",
      fontSize: 50
    }}
  >
    {children}
  </Typography>
);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
          borderColor: "primary.light",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "50%",
            bgcolor: "primary.light",
            color: "primary.contrastText",
            display: "flex",
          }}
        >
          {React.cloneElement(icon)}
        </Box>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
        {description}
      </Typography>
    </Paper>
  );
};

interface Feature {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const features: Feature[] = [
  {
    title: "Speaker Identification",
    icon: <FaceIcon />,
    description: "Match speaker segments to known identities using enrolment data.",
  },
  {
    title: "Speaker Diarization",
    icon: <SpeakerIcon />,
    description: "Identify boundaries between different speakers in audio.",
  },
  {
    title: "Language Identification",
    icon: <LanguageIcon />,
    description: "Detect languages in segments, supporting multilingual audio.",
  },
  {
    title: "Speech Recognition",
    icon: <SubtitlesIcon />,
    description: "Convert speech to accurate text in the spoken script.",
  },
  {
    title: "Neural Translation",
    icon: <TranslateIcon />,
    description: "Translate transcribed text to English with speaker segmentation.",
  },
];

const Home: React.FC = () => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const navigation = useNavigate()
  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 4 : 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800 }}
        >
          <GradientText>Sada Innovations</GradientText>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          maxWidth="md"
          mx="auto"
          sx={{ lineHeight: 1.6 }}
        >
          Language-Agnostic Speaker Identification, Diarization, Transcription, and Translation
        </Typography>
        <Box mt={8} textAlign="center">
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: 2,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
              transition: "all 0.2s",
            }}
            onClick={() => navigation(appRoutes.uploadFile)}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 6, borderColor: "divider" }} />

      <Grid container spacing={4}>
        {features.map((feature, idx) => (
          <Grid size={6}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>


    </Container>
  );
};

export default Home;