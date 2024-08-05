import express from "express";
import { addIncome } from "../controllers/Income/createIncome.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getOneIncome } from "../controllers/Income/getOneIncome.js";
import { updateIncome } from "../controllers/Income/updateOneIncome.js";
import { deleteIncome } from "../controllers/Income/deleteIncome.js";
import { getAllIncomes } from "../controllers/Income/getAllIncome.js";

const incomeRouter = express.Router();

incomeRouter
  .route("/")
  .get(checkAuth, getAllIncomes)
  .post(checkAuth, addIncome);

incomeRouter
  .route("/:id")
  .get(checkAuth, getOneIncome)
  .delete(checkAuth, deleteIncome)
  .put(checkAuth, updateIncome);

export { incomeRouter };
