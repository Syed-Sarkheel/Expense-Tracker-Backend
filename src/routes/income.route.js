import { addIncome } from "../controllers/Income/createIncome.js";
import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getOneIncome } from "../controllers/Income/getOneIncome.js";
import { updateIncome } from "../controllers/Income/updateOneIncome.js";

const incomeRouter = express.Router();

incomeRouter
  .route("/")
  //   .get(checkAuth, getAllIncomes)
  .post(checkAuth, addIncome);

incomeRouter
  .route("/:id")
  .get(checkAuth, getOneIncome)
  //   .delete(checkAuth, deleteIncome)
  .put(checkAuth, updateIncome);

export { incomeRouter };
