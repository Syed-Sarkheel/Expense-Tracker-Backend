import mongoose from "mongoose";
import { Income } from "../../models/income.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllIncomes = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid ID"));
    }

    const income = await Income.aggregate([
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
          income[0]?.totalAmount,
          "Total income fetched successfully!"
        )
      );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "failed to fetch total income!"));
  }
};
export { getAllIncomes };
