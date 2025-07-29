import {
  STATUS_MAPPING,
  type IFileUploadResponse,
  type IFileUploadServiceRequest,
  type IResponse,
} from "../types";
import apiClient from "./apiClient";
import { apiUrls } from "./apiUrls";

const uploadFile = async (
  payload: IFileUploadServiceRequest
): Promise<IResponse<IFileUploadResponse|null>> => {
  const formData = new FormData();
  formData.append("file", payload.file); // Assuming file is an array, we take the first file
  formData.append("name", payload.name);

  try {
    const response: IFileUploadResponse = await apiClient.post(
      apiUrls.uploadFile,
      formData
    );
    return { isSuccess: true, data: response };
  } catch (error) {
    console.error("uploadFile", error);
    return { isSuccess: false, data: null }; // Return null for data on error
  }
};

const getFiles = async (
  id: string
): Promise<IResponse<IFileUploadResponse|null>> => {
  try {
    const response: IFileUploadResponse = await apiClient.get(
      `${apiUrls.getById}/${id}`
    );
    return { isSuccess: true, data: response };
  } catch (error) {
    console.error("uploadFile", error);
    return { isSuccess: false, data: null }; // Return null for data on error
  }
};
const changeFileStatuts = async (
  status: string,
  id: string,
): Promise<IResponse<IFileUploadResponse|null>> => {
  try {
    let url = "";
    switch (Number(status)) {
      case STATUS_MAPPING.upload:
        url = apiUrls.speakerIdentification;
        break;

      case STATUS_MAPPING.done_speaker_identification:
        url = apiUrls.speakerDiarization;
        break;

      case STATUS_MAPPING.done_speaker_diarization:
        url = apiUrls.speechRecognition;
        break;

      case STATUS_MAPPING.done_speech_recognition:
        url = apiUrls.languageIdentification;
        break;

      case STATUS_MAPPING.done_language_identification:
        url = apiUrls.neuralTranslation;
        break;

        break;
      default:
        url = apiUrls.speakerIdentification;
        break;
    }
    const response: IFileUploadResponse = await apiClient.put(`${url}/${id}`);
    return { isSuccess: true, data: response };
  } catch (error) {
    console.error("uploadFile", error);
    return { isSuccess: false, data: null  }; // Return null for data on error
  }
};

export { uploadFile, getFiles, changeFileStatuts };
