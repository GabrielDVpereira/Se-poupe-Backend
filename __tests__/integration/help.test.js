const request = require("supertest");
const app = require("../../src/index");
const initTestDatabase = require("../config/database.test");

describe("Help model test", () => {
  beforeAll(async () => {
    await initTestDatabase();
  });

  it("Should create a new spend successfully", async () => {
    const fakeSpend = {
      name: "Vaigem pra Alemanha",
      category: "teste2",
      value: 1000,
      date: "03/24/2020",
      local: "casa do carai",
    };

    const response = await request(app).post("/spend").send(fakeSpend);
    expect(response.status).toBe(200);
  });
});
