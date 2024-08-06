import { Income } from "../../models/income.model.js";
import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getBalance = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      res.status(400).send(new ApiResponse(400, null, "Invalid ID"));
    }

    const expense = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const income = await Income.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const balance = expense?.[0]?.totalAmount - income?.[0]?.totalAmount;

    res
      .status(200)
      .send(
        new ApiResponse(200, balance, "Total balance fetched successfully!")
      );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "failed to fetch total balance!"));
  }
};
export { getBalance };
