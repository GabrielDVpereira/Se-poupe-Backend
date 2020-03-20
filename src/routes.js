const express = require("express");
const routes = express.Router();
const spendController = require("./controllers/spendController");
const validationMiddleware = require("./middlewares/validations");
const requestMetadata = require("./middlewares/meta");
// routes.use(requestMetadata);

routes.post(
  "/spend",
  validationMiddleware.validateInput,
  spendController.store
);
routes.get("/spend", spendController.index);
routes.delete("/spend/:id", spendController.delete);

module.exports = routes;
