import { Router } from "express";

import authController from "./auth.controller.js";
import { loginValidation } from "./auth.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const router = Router();

router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);

export default router;