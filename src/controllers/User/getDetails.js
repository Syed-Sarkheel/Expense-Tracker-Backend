import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required Fields missing!"));
    }

    const exists = User.findById(id);

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "User with provided mail does not exist")
        );
    }

    const userResponse = await User.findById(id).select("-password -__v");

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { user: userResponse },
          "User data fetched sucessfully!"
        )
      );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, null, "Failed to fetch user details!"));
  }
};
export { getUser };
