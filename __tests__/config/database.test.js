const mongoose = require("mongoose");

async function initTestDatabase() {
  await mongoose.connect(
    global.__MONGO_URI__,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        process.exit(1);
      }
    }
  );

  return { connected: true };
}

describe("database connection", () => {
  it("should connect to databse successfully", async () => {
    const database = await initTestDatabase();
    expect(database.connected).toBeTruthy();
  });
});

module.exports = initTestDatabase;
