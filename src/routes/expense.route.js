import express from "express";
import { addExpense } from "../controllers/Expense/createExpense.js";
import { deleteExpense } from "../controllers/Expense/deleteExpense.js";
import { updateExpense } from "../controllers/Expense/updateExpense.js";
import { getAllExpenses } from "../controllers/Expense/getAllExpense.js";
import { getOneExpense } from "../controllers/Expense/getOneExpense.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .post(checkAuth, addExpense)
  .get(checkAuth, getAllExpenses);

expenseRouter
  .route("/:id")
  .get(checkAuth, getOneExpense)
  .delete(checkAuth, deleteExpense)
  .put(checkAuth, updateExpense);

export { expenseRouter };
