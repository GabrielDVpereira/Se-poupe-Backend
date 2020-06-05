const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/index");
const hashPassword = require("../../src/utils/hash");


describe("User model test", () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.log(error);
          process.exit(1);
        }
      }
    );
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
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('birthdate')
    expect(response.body).toHaveProperty('income')
    expect(response.headers['x-auth-token']).toBeTruthy();
  });
  it('should generate hash for password', () => {
    const passwordHashed = hashPassword('12345'); 
    expect(passwordHashed).toBeTruthy();
  })
});
