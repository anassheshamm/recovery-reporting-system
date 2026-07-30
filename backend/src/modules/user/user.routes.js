import { Router } from "express";
import userController from "./user.controller.js";
import { createUserValidation } from "./user.validation.js";
import validate from "../../middlewares/validate.middleware.js";

import protect from "../../middlewares/protect.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
const router = Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createUserValidation,
  validate,
  userController.create
);

export default router;