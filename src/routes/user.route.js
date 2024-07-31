import express from "express";
import { updateUser } from "../controllers/User/updateDetails.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/User/getDetails.js";

const userRouter = express.Router();

userRouter.route("/:id").get(checkAuth, getUser).put(checkAuth, updateUser);

export { userRouter };
