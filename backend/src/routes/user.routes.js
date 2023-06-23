import express from "express";
import {
  getProfile,
  login,
  registerAsAdmin,
  registerAsBuyer,
} from "../controllers/user.controller.js";
import {
  validateLogin,
  validateUserRegistration,
} from "../validators/user.validator.js";
import authenticate from "../middlewares/auth.middleware.js";
// import buyer from '../middlewares/buyer.middleware.js'
const router = express.Router();

router.get("/profile", authenticate, getProfile);

// router.get("/has-voted", authenticate,buyer, checkIfUserVoted)

router.post("/admin/register", validateUserRegistration, registerAsAdmin);

router.post("/buyer/register", validateUserRegistration, registerAsBuyer);

router.post("/login", validateLogin, login);

export default router;
