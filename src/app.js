import express from "express";
import { indexRouter } from "./routes/index.route.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import cors from "cors";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: "GET,POST,PUT,PATCH,DELETE", // Specify allowed methods
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
    credentials: true, // Allow cookies to be sent/received
  })
);

app.use(express.json()); //Body Parser

app.use("/", indexRouter);

app.use("/*", (req, res, next) => {
  return res
    .status(404)
    .send(new ApiResponse(404, null, "No such route exists"));
});

export { app };
