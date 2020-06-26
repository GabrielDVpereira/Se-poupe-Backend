const express = require("express");
const routes = express.Router();
const spendController = require("./controllers/spendController");
const validationMiddleware = require("./middlewares/validations");
const requestMetadata = require("./middlewares/meta");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const authorize = require("./middlewares/authorization");

routes.use(requestMetadata);

routes.post("/user/auth", authController.auth);
routes.post(
  "/user/register",
  validationMiddleware.validateNewUserBody,
  userController.create
);

routes.use(authorize);
routes.post(
  "/spend",
  [validationMiddleware.validateNewSpendBody],
  spendController.store
);
routes.get("/spends", spendController.index);
routes.delete("/spend/:id", spendController.delete);
routes.get("/user/current", userController.current);

module.exports = routes;
