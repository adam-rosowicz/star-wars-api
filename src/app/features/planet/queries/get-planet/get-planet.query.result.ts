import { QueryResult } from "@tshio/query-bus";
import { StarWarsPlanet } from "../../../../../shared/integrations/starwars-api";

export class GetPlanetQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsPlanet | null) {}
}
