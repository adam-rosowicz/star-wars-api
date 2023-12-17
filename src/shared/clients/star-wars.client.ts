import { Logger } from "@tshio/logger";
import axios, { AxiosInstance } from "axios";
import { StarWarsApiConfig } from "../../config/star-wars-api";
import { HttpError } from "../../errors/http.error";

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
  consumables?: string; // Assuming it's optional
  films: string[]; // Assuming Film URL Resources are strings
  pilots: string[]; // Assuming People URL Resources are strings
  url: string;
  created: string;
  edited: string;
};

interface StarWarsSpeciesResponse extends StarWarsResponse {
  results: StarWarsSpecie[];
}

interface StarWarsVehiclesResponse extends StarWarsResponse {
  results: StarWarsVehicle[];
}

interface StarWarsResponse {
  count: number;
  next: string | null;
  previous: string | null;
}

interface StarWarsFilmsResponse extends StarWarsResponse {
  results: StarWarsFilm[];
}

interface StarWarsClientDependepncies {
  starWarsApiConfig: StarWarsApiConfig;
  logger: Logger;
}

export class StarWarsClient {
  private client: AxiosInstance;

  constructor(private dependencies: StarWarsClientDependepncies) {
    this.client = axios.create({
      baseURL: this.dependencies.starWarsApiConfig.baseUrl,
      headers: { Accept: "application/json" },
    });
  }

  public async getFilms(filter?: string) {
    try {
      let path = "/films";
      if (filter && filter !== "") {
        path += `?search=${filter}`;
      }
      const { data } = await this.client.get<StarWarsFilmsResponse>(path);

      return data.results;
    } catch (error: any) {
      this.dependencies.logger.error("Could not get films");

      this.dependencies.logger.debug(`Error: ${JSON.stringify(error, null, 2)}`);

      if (error?.response?.data) {
        throw new HttpError(error.response.data.message, error.response.data.status);
      }

      throw error;
    }
  }

  public async getSpecies(filter?: string) {
    try {
      let path = "/species";
      if (filter && filter !== "") {
        path += `?search=${filter}`;
      }
      const result: StarWarsSpecie[] = [];
      let nextUrl: string | null = path;

      while (nextUrl) {
        // eslint-disable-next-line no-await-in-loop
        const { data }: { data: StarWarsSpeciesResponse } = await this.client.get<StarWarsSpeciesResponse>(nextUrl);
        result.push(...data.results);

        const nextPageNumber: string | undefined = data.next?.charAt(data.next.length - 1) ?? undefined;

        nextUrl = nextPageNumber ? `${path}?page=${nextPageNumber}` : null;
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

  public async getVehicles(filter?: string) {
    try {
      let path = "/vehicles";
      if (filter && filter !== "") {
        path += `?search=${filter}`;
      }
      const result: StarWarsVehicle[] = [];
      let nextUrl: string | null = path;

      while (nextUrl) {
        // eslint-disable-next-line no-await-in-loop
        const { data }: { data: StarWarsVehiclesResponse } = await this.client.get<StarWarsVehiclesResponse>(nextUrl);
        result.push(...data.results);

        const nextPageNumber: string | undefined = data.next?.charAt(data.next.length - 1) ?? undefined;

        nextUrl = nextPageNumber ? `${path}?page=${nextPageNumber}` : null;
      }

      return result;
    } catch (error: any) {
      this.dependencies.logger.error("Could not get vehicles");

      this.dependencies.logger.debug(`Error: ${JSON.stringify(error, null, 2)}`);

      if (error?.response?.data) {
        throw new HttpError(error.response.data.message, error.response.data.status);
      }

      throw error;
    }
  }
}
