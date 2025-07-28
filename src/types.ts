export interface IFileUploadServiceProps {
  file: File[];
}
export interface IResponse<T> {
  isSuccess: boolean;
  data: T;
}

export interface IFileUploadResponse {
  file_url: string
  filename: string
  file_size: number
  upload_time: string
  file_type: string
}

