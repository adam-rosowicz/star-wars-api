import { Logger } from "@tshio/logger";
import axios, { AxiosInstance } from "axios";
import { StarWarsApiConfig } from "../../config/star-wars-api";
import { HttpError } from "../../errors/http.error";

type StarWarsFilm = {
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

  public async getFilms() {
    try {
      const { data } = await this.client.get<StarWarsFilmsResponse>("/films");

      return data;
    } catch (error: any) {
      this.dependencies.logger.error("Could not get films");

      this.dependencies.logger.debug(`Error: ${JSON.stringify(error, null, 2)}`);

      if (error?.response?.data) {
        throw new HttpError(error.response.data.message, error.response.data.status);
      }

      throw error;
    }
  }
}
