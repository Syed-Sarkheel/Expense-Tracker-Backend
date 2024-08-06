import { getBalance } from "../controllers/Balance/getBalance.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import express from "express";

const balanceRouter = express.Router();

balanceRouter.route("/").get(checkAuth, getBalance);

export { balanceRouter };
