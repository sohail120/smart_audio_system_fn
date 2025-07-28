import type {
  IFileUploadResponse,
  IFileUploadServiceProps,
  IResponse,
} from "../types";
import apiClient from "./apiClient";
import { apiUrls } from "./apiUrls";

export const fileUploadService = async (
  payload: IFileUploadServiceProps
): Promise<IResponse<string>> => {
  try {
    const formData = new FormData();
    formData.append("file", payload.file[0]);
    const response: IFileUploadResponse = await apiClient.post(
      apiUrls.uploadFile,
      formData
    );
    return { isSuccess: true, data: response.file_url };
  } catch (error) {
    console.error("fileUploadService", error);
    return { isSuccess: false, data: "" };
  }
};
