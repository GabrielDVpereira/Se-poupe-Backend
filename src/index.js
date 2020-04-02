const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes.js");
const cors = require("cors");
require("dotenv/config");

const dbAtlas =
  "mongodb://oministack:gabriel299@cluster0-shard-00-00-ldd1j.mongodb.net:27017,cluster0-shard-00-01-ldd1j.mongodb.net:27017,cluster0-shard-00-02-ldd1j.mongodb.net:27017/SePoupe?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(dbAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connect to MongoDB"))
  .catch(err => console.error("could not connect to MongoDB" + err));

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3333);
