import { Logger } from "@tshio/logger";
import { AxiosInstance } from "axios";
import { StarWarsApiConfig } from "../../../config/star-wars-api";
import { HttpError } from "../../../errors/http.error";
import { HttpProvider } from "../http-provider";

export type StarWarsFilm = {
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export type StarWarsSpecie = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

export type StarWarsVehicle = {
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables?: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
};

export type StarWarsStarship = {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables?: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
};

export type StarWarsPlanet = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

interface StarWarsResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface StarWarsApiDependepncies {
  starWarsApiConfig: StarWarsApiConfig;
  httpProvider: HttpProvider;
  logger: Logger;
}

export enum ResourcesType {
  Films = "films",
  People = "people",
  Planets = "planets",
  Species = "species",
  Starships = "starships",
  Vehicles = "vehicles",
}

export class StarWarsApi {
  private httpClient: AxiosInstance;

  constructor(private readonly dependencies: StarWarsApiDependepncies) {
    this.httpClient = this.dependencies.httpProvider.createAxiosClientInstance({
      baseUrl: this.dependencies.starWarsApiConfig.baseUrl,
    });

    this.httpClient.defaults.headers.common = { Accept: "application/json" };
  }

  public async getResource<T>(resourceType: ResourcesType, id: string) {
    const path = `/${resourceType}/${id}`;

    try {
      const { data } = await this.httpClient.get<T>(path);

      return data as T;
    } catch (error: any) {
      this.dependencies.logger.error("Could not get species");

      this.dependencies.logger.debug(`Error: ${JSON.stringify(error, null, 2)}`);

      if (error?.response?.data) {
        throw new HttpError(error.response.data.message, error.response.data.status);
      }

      throw error;
    }
  }

  public async getResources<T>(resourcesType: ResourcesType, filter?: string, page?: number) {
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
      this.dependencies.logger.error("Could not get species");

      this.dependencies.logger.debug(`Error: ${JSON.stringify(error, null, 2)}`);

      if (error?.response?.data) {
        throw new HttpError(error.response.data.message, error.response.data.status);
      }

      throw error;
    }
  }
}
