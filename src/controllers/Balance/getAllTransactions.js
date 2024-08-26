import { Expense } from "../../models/expense.model.js";
import { Income } from "../../models/income.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllTransactions = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid ID"));
    }

    // Fetch expenses and add a type field to differentiate
    const expenses = await Expense.find({ user: id })
      .select("-user -__v")
      .lean();

    const expensesWithType = expenses.map((expense) => ({
      ...expense,
      type: "expense",
    }));

    // Fetch income and add a type field to differentiate
    const income = await Income.find({ user: id }).select("-user -__v").lean();

    const incomeWithType = income.map((income) => ({
      ...income,
      type: "income",
    }));

    // Combine expenses and income into a single array
    const transactions = [...expensesWithType, ...incomeWithType];

    // Sort transactions by date (descending order: newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          transactions,
          "All transactions fetched and sorted successfully!"
        )
      );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to fetch all transactions!"));
  }
};

export { getAllTransactions };
