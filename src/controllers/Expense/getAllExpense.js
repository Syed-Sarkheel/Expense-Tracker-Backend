import mongoose from "mongoose";
import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllExpenses = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid ID"));
    }

    const expense = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(id), // Match documents where the user field equals the user's ID
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          expense[0]?.totalAmount,
          "Total expense fetched successfully!"
        )
      );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "failed to fetch total expense!"));
  }
};
export { getAllExpenses };
