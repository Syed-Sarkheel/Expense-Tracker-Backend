import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
});

export const Income = mongoose.model("income", incomeSchema);
