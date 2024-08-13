import express from "express";
import { registerUser } from "../controllers/Auth/registerUser.js";
import { loginUser } from "../controllers/Auth/loginUser.js";
import { generateOTP } from "../controllers/Auth/generateOTP.js";
import { confirmOTP } from "../controllers/Auth/confirmOTP.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);

authRouter.route("/login").post(loginUser);

authRouter.route("/generateOTP").post(generateOTP);

authRouter.route("/confirmOTP").post(confirmOTP);

export { authRouter };
