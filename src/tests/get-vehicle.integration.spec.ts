import { expect } from "chai";
import request from "supertest";
import "mocha";
import * as sinon from "sinon";

describe("getVehicle", () => {
  afterEach(async () => {
    sinon.restore();
  });

  it("should return vehicle", async () => {
    sinon
      .stub(global.container.cradle.starWarsApi, "getResource")
      .callsFake(() => {})
      .returns({
        cargo_capacity: "50000",
        consumables: "2 months",
        cost_in_credits: "150000",
        created: "2014-12-10T15:36:25.724000Z",
        crew: "46",
        edited: "2014-12-10T15:36:25.724000Z",
        length: "36.8",
        manufacturer: "Corellia Mining Corporation",
        max_atmosphering_speed: "30",
        model: "Digger Crawler",
        name: "Sand Crawler",
        passengers: "30",
        pilots: [],
        films: ["https://swapi.dev/api/films/1/"],
        url: "https://swapi.dev/api/vehicles/4/",
        vehicle_class: "wheeled",
      });

    const id = 1;
    const response = await request(await global.container.cradle.app)
      .post("/graphql")
      .send({
        query: `query { getVehicle(id: "${id}") { passengers, length, model } }`,
      });

    expect(response.body.data.getVehicle).to.deep.equal({ passengers: "30", length: "36.8", model: "Digger Crawler" });
  });

  it("should return null", async () => {
    sinon
      .stub(global.container.cradle.starWarsApi, "getResource")
      .callsFake(() => {})
      .returns({});
    const id = 1;
    const response = await request(await global.container.cradle.app)
      .post("/graphql")
      .send({
        query: `query { getVehicle(id: "${id}") { passengers, length } }`,
      });

    expect(response.body.data.getVehicle).to.be.null;
  });
});
