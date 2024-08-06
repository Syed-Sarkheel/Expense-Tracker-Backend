import express from "express";
import { authRouter } from "./auth.route.js";
import { userRouter } from "./user.route.js";
import { expenseRouter } from "./expense.route.js";
import { categoryRouter } from "./category.route.js";
import { incomeRouter } from "./income.route.js";
import { balanceRouter } from "./balance.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1/auth", authRouter);

indexRouter.use("/api/v1/user", userRouter);

indexRouter.use("/api/v1/expense", expenseRouter);

indexRouter.use("/api/v1/category", categoryRouter);

indexRouter.use("/api/v1/income", incomeRouter);

indexRouter.use("/api/v1/balance", balanceRouter);

export { indexRouter };
