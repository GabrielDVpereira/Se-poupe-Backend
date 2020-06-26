const request = require("supertest");
const app = require("../../src/index");
const initTestDatabase = require("../config/database.test");

describe("User model test", () => {
  beforeAll(async () => {
    await initTestDatabase();
  });

  it("Should create and save user successfully", async () => {
    const mockUser = {
      name: "teste",
      email: "teste@teste.com",
      birthdate: "2020-02-02",
      password: "111111",
      income: 2000,
    };

    const response = await request(app).post("/user/register").send(mockUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("birthdate");
    expect(response.body).toHaveProperty("income");
    expect(response.headers["x-auth-token"]).toBeTruthy();
  });
});
