import express from "express";
import { registerUser } from "../controllers/Auth/registerUser.js";
import { loginUser } from "../controllers/Auth/loginUser.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);

authRouter.route("/login").post(loginUser);

export { authRouter };
