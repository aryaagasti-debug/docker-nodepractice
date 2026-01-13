const request = require("supertest");
const app = require("../main");

describe("GET /", () => {
  it("should return running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Express server is running");
  });
});
