const express = require("express");
const routes = express.Router();
const spendController = require("./controllers/spendController");
const validationMiddleware = require("./middlewares/validations");
const requestMetadata = require("./middlewares/meta");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const authorize = require("./middlewares/authorization");

routes.use(requestMetadata);

routes.post(
  "/spend",
  [authorize, validationMiddleware.validateNewSpendBody],
  spendController.store
);
routes.get("/spends", authorize, spendController.index);
routes.delete("/spend/:id", authorize, spendController.delete);

routes.post(
  "/user/register",
  validationMiddleware.validateNewUserBody,
  userController.create
);
routes.post("/user/auth", authController.auth);
routes.get("/user/current", authorize, userController.current);

module.exports = routes;
