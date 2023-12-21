import { Logger } from "@tshio/logger";
import { AxiosInstance } from "axios";
import { StarWarsApiConfig } from "../../../config/star-wars-api";
import { HttpProvider } from "../http-provider/htttp-provider";
import { ResourcesType, StarWarsResponse } from "../../types/starwars.types";

interface StarWarsApiDependepncies {
  starWarsApiConfig: StarWarsApiConfig;
  httpProvider: HttpProvider;
  logger: Logger;
}

export class StarWarsApi {
  private httpClient: AxiosInstance;

  constructor(private readonly dependencies: StarWarsApiDependepncies) {
    this.httpClient = this.dependencies.httpProvider.createAxiosClientInstance({
      baseUrl: this.dependencies.starWarsApiConfig.baseUrl,
    });

    this.httpClient.defaults.headers.common = { Accept: "application/json" };
  }

  public async getResource<T>(resourceType: ResourcesType, id: string): Promise<T | null> {
    const path = `/${resourceType}/${id}`;
    try {
      const { data } = await this.httpClient.get<T>(path);

      return data as T;
    } catch (error: any) {
      this.dependencies.logger.error("Could not get resource");

      this.dependencies.logger.debug(`Error: ${JSON.stringify(error, null, 2)}`);

      if (error?.response?.data) {
        return null;
      }

      throw error;
    }
  }

  public async getResources<T>(resourcesType: ResourcesType, filter?: string, page?: number): Promise<T[]> {
    try {
      const result: T[] = [];

      const path = `/${resourcesType}`;

      if (!page) {
        let pageNumber: number | null = 1;
        while (pageNumber) {
          const {
            data: { results, next }, // eslint-disable-next-line no-await-in-loop
          }: { data: StarWarsResponse<T> } = await this.httpClient.get<StarWarsResponse<T>>(path, {
            params: {
              search: filter,
              page: pageNumber,
            },
          });
          result.push(...results);

          pageNumber = next ? pageNumber + 1 : null;
        }
      } else {
        const {
          data: { results },
        }: { data: StarWarsResponse<T> } = await this.httpClient.get<StarWarsResponse<T>>(path, {
          params: {
            page,
            search: filter,
          },
        });

        result.push(...results);
      }

      return result;
    } catch (error: any) {
      this.dependencies.logger.error("Could not get resources");

      this.dependencies.logger.debug(`Error: ${JSON.stringify(error, null, 2)}`);

      if (error?.response?.data) {
        return [];
      }

      throw error;
    }
  }
}
