import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required Fields Missing"));
    }

    const exists = await User.findOne({ email: email });

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with provided email does not exist, please register first!"
          )
        );
    }

    const verified = await bcrypt.compare(password, exists.password);

    if (!verified) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Invalid Credentials"));
    }

    const at = exists.generateAccessToken();

    const rt = exists.generateRefreshToken();

    res.cookie("at", at);

    res.cookie("rt", rt);

    const userResponse = await User.findById(exists._id).select(
      "-password -__v"
    );

    res
      .status(200)
      .send(
        new ApiResponse(
          201,
          { user: userResponse, accessToken: at, refreshToken: rt },
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to login user"));
  }
};

export { loginUser };
