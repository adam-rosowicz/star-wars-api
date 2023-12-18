import { Logger } from "@tshio/logger";
import axiosRetry from "axios-retry";
import axios, { AxiosError, AxiosInstance } from "axios";

export type HttpProviderInstance = AxiosInstance;

export type HttpProviderError<T> = AxiosError<T>;

export type ClientConfig = {
  baseUrl: string;
  timeout?: number;
};

export const httpProviderConfiguration = {
  timeout: 10_000,
  retry: {
    count: 4,
    delayBase: 1_000, // in Milliseconds
  },
} as const;

type HttpProviderDependencies = {
  logger: Logger;
};

export class HttpProvider {
  private logger: Logger;

  constructor(private readonly dependencies: HttpProviderDependencies) {
    this.logger = this.dependencies.logger;
  }

  private setUpClientRetry(client: HttpProviderInstance) {
    axiosRetry(client, {
      retries: httpProviderConfiguration.retry.count,
      retryDelay: (retryCount: number) => retryCount * httpProviderConfiguration.retry.delayBase,
      onRetry: (retryCount: number, error: any) => {
        this.logger.info(
          `[RETRY] Error occurred ${JSON.stringify({
            error: {
              code: error.code || "UNKNOWN",
              message: error.message || "UNKNOWN",
              retryCount,
            },
          })}`,
        );
      },
    });
  }

  private setUpRequestLoggingInterceptors(client: HttpProviderInstance) {
    client.interceptors.request.use(
      (request) => {
        this.logger.info(
          `[AXIOS] Request: ${JSON.stringify({
            request: request.method?.toUpperCase(),
            url: request.url,
            params: request.params,
            headers: request.headers,
            data: request.data,
          })}`,
        );
        return request;
      },
      (error) => {
        this.logger.warn("[AXIOS][ERROR] Request:", { error });
        return Promise.reject(error);
      },
    );
  }

  private setUpResponseLoggingInterceptors(client: HttpProviderInstance) {
    client.interceptors.response.use(
      (response) => {
        this.logger.info(
          `[AXIOS] Response: ${JSON.stringify({
            response: response.status,
            data: response.data,
          })}`,
        );
        return response;
      },
      (error) => {
        this.logger.warn("[AXIOS][ERROR] Response:", { error });
        return Promise.reject(error);
      },
    );
  }

  createAxiosClientInstance(
    config: ClientConfig,
    {
      useClientRetryInterceptor = true,
      useRequestLoggingInterceptor = true,
      useResponseLoggingInterceptor = true,
    } = {},
  ) {
    const client = axios.create({
      timeout: config.timeout || httpProviderConfiguration.timeout,
      baseURL: config.baseUrl,
      headers: {
        "Content-Type": "application/json",
        "X-Requested-By": config.baseUrl,
        Referer: config.baseUrl,
      },
    });

    if (useClientRetryInterceptor) {
      this.setUpClientRetry(client);
    }

    if (useRequestLoggingInterceptor) {
      this.setUpRequestLoggingInterceptors(client);
    }

    if (useResponseLoggingInterceptor) {
      this.setUpResponseLoggingInterceptors(client);
    }

    return client;
  }
}
