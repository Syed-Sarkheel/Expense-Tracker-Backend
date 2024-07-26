import express from "express";
import { addCategory } from "../controllers/Category/addCategory.js";
import { getAllCategories } from "../controllers/Category/getAllCategories.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(checkAuth, getAllCategories)
  .post(checkAuth, addCategory);

export { categoryRouter };
