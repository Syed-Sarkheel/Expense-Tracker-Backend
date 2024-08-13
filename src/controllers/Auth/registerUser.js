import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid email format"));
    }

    const exists = await User.findOne({ email: email });

    if (exists) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "User with the provided email already exists"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = createdUser.generateAccessToken();
    const refreshToken = createdUser.generateRefreshToken();

    res.cookie("at", accessToken);
    res.cookie("rt", refreshToken);

    const userResponse = await User.findById(createdUser._id).select(
      "-password -__v"
    );

    res
      .status(201)
      .send(
        new ApiResponse(
          201,
          { user: userResponse, accessToken, refreshToken },
          "User created successfully"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to register user"));
  }
};

export { registerUser };
