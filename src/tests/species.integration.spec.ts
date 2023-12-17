import "mocha";
import request from "supertest";

describe("/api/species integration", () => {
  it("test example", async () => {
    return request(await global.container.cradle.app)
      .get("/health")
      .expect(200);
  });
});
