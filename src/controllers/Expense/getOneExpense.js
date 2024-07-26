import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getOneExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const expense = await Expense.findOne({
      $and: [{ _id: id }, { user: req.user._id }],
    }).select("-user -__v");

    if (!expense) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "Expense with provided ID does not exist")
        );
    }

    res
      .status(200)
      .send(new ApiResponse(200, expense, "Expense fetched successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        new ApiResponse(
          500,
          error,
          "Failed to retrieve expense with the provided ID"
        )
      );
  }
};
export { getOneExpense };
