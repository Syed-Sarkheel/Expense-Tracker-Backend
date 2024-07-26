import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).select(
      "-user -__v"
    );

    if (!expenses) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "No expenses exist"));
    }

    res
      .status(200)
      .send(new ApiResponse(200, expenses, "Expense fetched successfully"));
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
export { getAllExpenses };
