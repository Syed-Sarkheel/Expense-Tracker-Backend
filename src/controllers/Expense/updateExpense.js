import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, category, description } = req.body;

    if (!date || !amount || !category || !description || !id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const obj = await Expense.findById(id);

    if (String(obj.user) !== req.user._id) {
      return res
        .status(403)
        .send(
          new ApiResponse(
            403,
            null,
            "You don't have access to update this expense"
          )
        );
    }

    if (!obj) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "No expense wih provided ID exists"));
    }

    const updated = await Expense.findByIdAndUpdate(
      id,
      { date, amount, category, description },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Note updated sucessfully", note: updated });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to update expense"));
  }
};
export { updateExpense };
