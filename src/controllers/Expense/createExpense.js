import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const addExpense = async (req, res) => {
  try {
    const { date, amount, category, description } = req.body;

    if (!date || !amount || !category) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const expense = await Expense.create({
      user: req.user._id,
      date,
      amount,
      category,
      description,
    });

    res
      .status(201)
      .send(new ApiResponse(201, expense, "Expense created sucessfull!"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to create expense"));
  }
};
export { addExpense };
