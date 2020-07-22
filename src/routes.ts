import express from "express";
import spendController from "./controllers/spendController";
import validationMiddleware from "./middlewares/validations";
import requestMetadata from "./middlewares/meta";
import userController from "./controllers/userController";
import authController from "./controllers/authController";
import authorize from "./middlewares/authorization";

const routes = express.Router();
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

export default routes;
