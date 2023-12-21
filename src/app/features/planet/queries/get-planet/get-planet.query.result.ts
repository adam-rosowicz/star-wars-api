import { QueryResult } from "@tshio/query-bus";
import { StarWarsPlanet } from "../../../../../shared/types/starwars.types";

export class GetPlanetQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsPlanet | null) {}
}
