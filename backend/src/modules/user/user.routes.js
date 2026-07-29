import { Router } from "express";
import userController from "./user.controller.js";
import { createUserValidation } from "./user.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const router = Router();

router.post(
  "/",
  createUserValidation,
  validate,
  userController.create
);

export default router;