export type StarWarsPerson = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: "Male" | "Female" | "unknown" | "n/a";
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
};

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

export interface StarWarsResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export enum ResourcesType {
  Films = "films",
  People = "people",
  Planets = "planets",
  Species = "species",
  Starships = "starships",
  Vehicles = "vehicles",
}
