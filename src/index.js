const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes.js");
const cors = require("cors");
require("dotenv/config");

if(process.env.NODE_ENV !== 'test'){
  const dbAtlas = process.env.MONGO_URI;
  mongoose
    .connect(dbAtlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connect to MongoDB"))
    .catch((err) => console.error("could not connect to MongoDB" + err));
}

app.use(express.json());
app.use(cors());
app.use(routes);

module.exports = app;
