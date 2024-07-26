import express from "express";
import { authRouter } from "./auth.route.js";
import { userRouter } from "./user.route.js";
import { expenseRouter } from "./expense.route.js";
import { categoryRouter } from "./category.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1/auth", authRouter);

indexRouter.use("/api/v1/user", userRouter);

indexRouter.use("/api/v1/expense", expenseRouter);

indexRouter.use("/api/v1/category", categoryRouter);

export { indexRouter };
