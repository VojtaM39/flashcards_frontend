import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiCallException } from "@/exceptions/apicall.exception";
import { ApiResponse } from "@/interfaces/apiresponse.interface";

export default class ApiService {
  readonly BASE_URL = "http://127.0.0.1:3000/api";

  protected axiosInstance: AxiosInstance;

  constructor(baseEndpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: `${this.BASE_URL}/${baseEndpoint}`,
      withCredentials: true,
    });
  }

  protected async request<T, D = unknown>(
    config: AxiosRequestConfig
  ): Promise<T> {
    try {
      const axiosResponse = await this.axiosInstance.request<
        T,
        AxiosResponse<T>,
        D
      >(config);

      return axiosResponse.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        let status = 400;
        if (typeof err.status !== "undefined") status = parseInt(err.status);

        let message;
        if (err.response) {
          message = (err.response.data as ApiResponse).message;
        } else {
          message = err.message;
        }

        throw new ApiCallException(status, message);
      } else {
        throw new ApiCallException(400, (<Error>err).message);
      }
    }
  }

  protected get<T>(resource = "") {
    const config: AxiosRequestConfig = {
      url: resource,
      method: "get",
    };
    return this.request<T>(config);
  }

  protected post<T, D = unknown>(resource = "", data: D | null = null) {
    const config: AxiosRequestConfig<D> = {
      url: resource,
      method: "post",
    };

    if (data !== null) config.data = data;

    return this.request<T, D>(config);
  }

  protected put<T, D>(resource = "", data: D) {
    const config: AxiosRequestConfig<D> = {
      url: resource,
      data: data,
      method: "put",
    };
    return this.request<T, D>(config);
  }

  protected delete<T>(resource = "") {
    const config: AxiosRequestConfig = {
      url: resource,
      method: "delete",
    };
    return this.request<T>(config);
  }
}
