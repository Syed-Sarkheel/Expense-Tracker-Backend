import { Income } from "../../models/income.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Required Fields missing" });
    }

    const income = await Income.findOne({
      $and: [{ _id: id }, { user: req.user._id }],
    });

    if (!income) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "Income with provided ID does not exist!")
        );
    }

    await Income.findByIdAndDelete(id);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          null,
          "Income with provided ID deleted sucessfully!"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to delete income"));
  }
};
export { deleteIncome };
