import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import buyer from "../middlewares/buyer.middleware.js";
// import admin from "../middlewares/admin.middleware.js";
import {
  generateToken,
  validateToken,
  getTokensByMeterNumber,
} from "../controllers/token.controller.js";
// import { tokenValidator } from "../validators/token.validator.js";
const router = express.Router();

router.get("/generate", authenticate, buyer, generateToken);

router.post(
  "/validate",
  authenticate,
  buyer,
  validateToken
);

router.get(
  "/get-by-meter-nbr",
  authenticate,
  buyer,
  getTokensByMeterNumber
);

export default router;
