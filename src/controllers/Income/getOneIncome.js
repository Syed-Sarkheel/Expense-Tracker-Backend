import { Income } from "../../models/income.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getOneIncome = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const income = await Income.findOne({
      $and: [{ _id: id }, { user: req.user._id }],
    }).select("-user -__v");

    if (!income) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "Income with provided ID does not exist")
        );
    }

    res
      .status(200)
      .send(new ApiResponse(200, income, "Income fetched successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        new ApiResponse(
          500,
          error,
          "Failed to retrieve income with the provided ID"
        )
      );
  }
};
export { getOneIncome };
