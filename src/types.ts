export interface IFileUploadServiceRequest {
  file: File;
  name:string
}
export interface IResponse<T> {
  isSuccess: boolean;
  data: T;
}

export interface IFileUploadResponse {
  id: string
  name: string
  createdAt: string
  status: string
  url: string
}

