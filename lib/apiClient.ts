import { Church } from '@prisma/client';
import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface APISuccessResponse<T> {
  status: 'success';
  data: T;
}

export interface APIErrorResponse<T> {
  status: 'failed';
  error: Array<{ path: keyof Partial<T>; message: string }>;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    return axiosInstance.get<APISuccessResponse<T[]>>(this.endpoint, config);
  };

  get = async (id: string, config?: AxiosRequestConfig) => {
    const url = `${this.endpoint}/${id}`;
    return axiosInstance.get<APISuccessResponse<T>>(url, config);
  };

  create = async (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance.post<APISuccessResponse<T>>(
      this.endpoint,
      data,
      config
    );
  };

  update = async (id: string, data: any, config?: AxiosRequestConfig) => {
    const url = `${this.endpoint}/${id}`;
    return axiosInstance.patch<APISuccessResponse<T>>(url, data, config);
  };

  remove = async (id: string, config?: AxiosRequestConfig) => {
    const url = `${this.endpoint}/${id}`;
    return axiosInstance.delete<APISuccessResponse<T>>(url, config);
  };
}

export const churchApi = {
  basicInfo: new APIClient<Church>('/church/basic-info'),
};
