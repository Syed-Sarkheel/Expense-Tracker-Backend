import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required Fields Missing"));
    }

    const hashed = await bcrypt.hash(password, 10);

    const created = await User.create({
      name,
      email,
      password: hashed,
    });

    const at = created.generateAccessToken();

    const rt = created.generateRefreshToken();

    res.cookie("at", at);

    res.cookie("rt", rt);

    const userResponse = await User.findById(created._id).select(
      "-password -__v"
    );

    res
      .status(201)
      .send(
        new ApiResponse(
          201,
          { user: userResponse, accessToken: at, refreshToken: rt },
          "User Created Successfully"
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
