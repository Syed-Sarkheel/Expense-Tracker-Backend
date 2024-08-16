import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const checkAuth = (req, res, next) => {
  try {
    const bearerAuth = req.headers.authorization;

    if (!bearerAuth) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Missing header authorization"));
    }
    const token = bearerAuth.split(" ")[1];

    if (!token) {
      res.status(400).send(new ApiResponse(400, null, "No Token entered"));
    }

    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!userData) {
      res.status(401).send(new ApiResponse(401, null, "Invalid Token"));
    }

    req.user = userData;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
export { checkAuth };
