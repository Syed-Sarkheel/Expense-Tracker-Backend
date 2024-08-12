import { getAllTransactions } from "../controllers/Balance/getAllTransactions.js";
import { getBalance } from "../controllers/Balance/getBalance.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import express from "express";

const balanceRouter = express.Router();

balanceRouter.route("/").get(checkAuth, getBalance);

balanceRouter.route("/transactions").get(checkAuth, getAllTransactions);

export { balanceRouter };
