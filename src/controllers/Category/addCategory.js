import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing"));
    }

    const category = await Category.create({
      user: req.user._id,
      name,
    });

    res
      .status(201)
      .send(new ApiResponse(201, category, "Category created sucessfull!"));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to create expense"));
  }
};
export { addCategory };
