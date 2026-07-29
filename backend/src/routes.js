import { Router } from "express";
import userRoutes from "./modules/user/user.routes.js";

const router = Router();


router.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Recovery Reporting System API is running.",
  });
});

router.use("/users", userRoutes);

export default router;
