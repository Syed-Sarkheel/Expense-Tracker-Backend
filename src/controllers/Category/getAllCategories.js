import { Category } from "../../models/category.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id }).select(
      "-user -__v"
    );

    if (!categories) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "No categories exist"));
    }

    res
      .status(200)
      .send(
        new ApiResponse(200, categories, "Categories fetched successfully")
      );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to retrieve categories"));
  }
};
export { getAllCategories };
