const hashPassword = require("../../src/utils/hash");

describe("Bcrypt", () => {
  it("should generate hash for password", () => {
    const passwordHashed = hashPassword("12345");
    expect(passwordHashed).toBeTruthy();
  });
});
