import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required Fields missing!"));
    }

    const hashed = await bcrypt.hash(password, 10);

    const exists = await User.findByIdAndUpdate(
      id,
      { password: hashed },
      { new: true }
    );

    const userResponse = await User.findById(id).select("-password -__v");

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { user: userResponse },
          "User data updated sucessfully!"
        )
      );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, null, "Failed to fetch user details!"));
  }
};
export { updateUser };
