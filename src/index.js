const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes.js");
const cors = require("cors");

const dbAtlas =
  "mongodb+srv://oministack:gabriel299@cluster0-ldd1j.mongodb.net/SePoupe?retryWrites=true&w=majority";
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
