import { Expense } from "../../models/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Required Fields missing" });
    }

    const expense = await Expense.findOne({
      $and: [{ _id: id }, { user: req.user._id }],
    });

    if (!expense) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "Expense with provided ID does not exist!")
        );
    }

    await Expense.findByIdAndDelete(id);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          null,
          "Expense with provided ID deleted sucessfully!"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to delete expense"));
  }
};
export { deleteExpense };
