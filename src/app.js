import express from "express";
import { indexRouter } from "./routes/index.route.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

app.use(express.json()); //Body Parser

app.use("/", indexRouter);

app.use("/", (req, res, next) => {
  return res
    .status(404)
    .send(new ApiResponse(404, null, "No such route exists"));
});

export { app };
