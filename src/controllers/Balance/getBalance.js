import { Income } from "../../models/income.model.js";
import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

const getBalance = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid ID"));
    }

    let income = await Income.aggregate([
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

    if (income == "") {
      income = 0;
    } else {
      income = income?.[0]?.totalAmount;
    }

    let expense = await Expense.aggregate([
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

    if (expense == "") {
      expense = 0;
    } else {
      expense = expense?.[0]?.totalAmount;
    }

    const balance = income - expense;

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
