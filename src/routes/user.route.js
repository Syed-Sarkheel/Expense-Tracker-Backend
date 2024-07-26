import express from "express";
import { getUser } from "../controllers/User/getdetails.js";
import { updateUser } from "../controllers/User/updateDetails.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/:id").get(checkAuth, getUser).put(checkAuth, updateUser);

export { userRouter };
