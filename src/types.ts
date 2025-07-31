import type { Theme } from "@mui/material";

export interface IFileUploadServiceRequest {
  file: File;
  name: string;
}
export interface IResponse<T> {
  isSuccess: boolean;
  data: T;
}

export interface IFileUploadResponse {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  url: string;
}

export enum STATUS_MAPPING {
  upload = 0,
  processing_speaker_identification = 1,
  done_speaker_identification = 2,
  processing_speaker_diarization = 3,
  done_speaker_diarization = 4,
  processing_speech_recognition = 5,
  done_speech_recognition = 6,
  processing_language_identification = 7,
  done_language_identification = 8,
  processing_neural_translation = 9,
  done_neural_translation = 10,
}

export interface IAudioPlayerProps {
  data: IFileUploadResponse | null;
  theme: Theme;
}

export enum STATUS_API {
  processing_speaker_identification = 1,
  done_speaker_identification = 2,
  processing_speaker_diarization = 3,
  done_speaker_diarization = 4,
  processing_speech_recognition = 5,
  done_speech_recognition = 6,
  processing_language_identification = 7,
  done_language_identification = 8,
  done = 9,
}


export interface Segment {
  speaker: string;
  start: number;
  end: number;
  transcript: string;
  language: string;
  tranlate: string;
}

 export interface TranscriptionData {
  id: string;
  totalSpeakers: number;
  segment: Segment[];
}


