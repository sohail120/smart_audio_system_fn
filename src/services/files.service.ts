import type { IFileUploadResponse, IFileUploadServiceRequest, IResponse } from "../types";
import apiClient from "./apiClient";
import { apiUrls } from "./apiUrls";

const uploadFile = async (payload: IFileUploadServiceRequest): Promise<IResponse<IFileUploadResponse>> => {
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
    return { isSuccess: false, data: null as any }; // Return null for data on error
  }
}


export {uploadFile}