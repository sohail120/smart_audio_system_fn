// src/pages/UploadFile.tsx
import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Stack,
  LinearProgress,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../routing/appRoutes";

const UploadFile: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setUploadError(null);
    setUploadSuccess(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
      "video/*": [".mp4", ".mov"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemoveFile = () => {
    setFiles([]);
    setUploadError(null);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(false);

    // Simulate upload progress (replace with actual API call)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          navigate(appRoutes.processingProgress);
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      {/* Back Button */}
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
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
        Upload Media File
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "divider",
          backgroundColor: isDragActive ? "action.hover" : "background.paper",
          transition: "all 0.3s ease",
          mb: 4,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Stack alignItems="center" spacing={2} sx={{ py: 6 }}>
          <CloudUploadIcon
            fontSize="large"
            color={isDragActive ? "primary" : "action"}
          />
          <Typography variant="h6" textAlign="center">
            {isDragActive
              ? "Drop your file here"
              : "Drag & drop a file here, or click to select"}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Supported formats: MP3, WAV, M4A, MP4, MOV
          </Typography>
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
            sx={{ mt: 2 }}
          >
            Select File
          </Button>
        </Stack>
      </Paper>

      {files.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography variant="subtitle1">{files[0].name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {(files[0].size / (1024 * 1024)).toFixed(2)} MB
              </Typography>
            </Stack>
            <IconButton onClick={handleRemoveFile} color="error">
              <CloseIcon />
            </IconButton>
          </Stack>

          {isUploading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" color="text.secondary">
                {uploadProgress}% uploaded
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {uploadError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {uploadError}
        </Alert>
      )}

      {uploadSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          File uploaded successfully!
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleBack} sx={{ px: 4, py: 1.5 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleUpload}
          disabled={files.length === 0 || isUploading}
          sx={{ px: 4, py: 1.5 }}
        >
          {isUploading ? "Uploading..." : "Process File"}
        </Button>
      </Box>

      {uploadSuccess && (
        <Paper variant="outlined" sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Processing Results
          </Typography>
          <Typography>
            Your file is being processed. You'll be able to view the
            transcription, speaker identification, and translation shortly.
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>
            View Results
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default UploadFile;
