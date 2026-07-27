import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Recovery Reporting System API is running.",
  });
});

export default router;
