import { Income } from "../../models/income.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const addIncome = async (req, res) => {
  try {
    const { date, amount, category, description } = req.body;

    if (!date || !amount || !category) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const income = await Income.create({
      user: req.user._id,
      date,
      amount,
      category,
      description,
    });

    res
      .status(201)
      .send(new ApiResponse(201, income, "Income created sucessfull!"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to create Income"));
  }
};
export { addIncome };
