import { Income } from "../../models/income.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, category, description } = req.body;

    if (!date || !amount || !category) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const obj = await Income.findById(id);

    if (String(obj.user) !== req.user._id) {
      return res
        .status(403)
        .send(
          new ApiResponse(
            403,
            null,
            "You don't have access to update this Income"
          )
        );
    }

    if (!obj) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "No income wih provided ID exists"));
    }

    const updated = await Income.findByIdAndUpdate(
      id,
      { date, amount, category, description },
      { new: true }
    );

    res
      .status(200)
      .send(new ApiResponse(200, updated, "Income updated sucessfully"));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to update Income"));
  }
};
export { updateIncome };
