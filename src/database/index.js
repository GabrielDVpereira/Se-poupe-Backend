const mongoose = require("mongoose");

class Database {
  constructor() {
    this.init();
  }
  init() {
    if (process.env.NODE_ENV !== "test") {
      const dbAtlas = process.env.MONGO_URI;
      mongoose
        .connect(dbAtlas, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log("Connect to MongoDB"))
        .catch((err) => console.error("could not connect to MongoDB" + err));
    }
  }
}

module.exports = new Database();
