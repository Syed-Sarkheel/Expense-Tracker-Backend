import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    code: { type: Number, required: true },
    email: { type: String, required: true },
  },

  { timestamps: true }
);

export const Otp = mongoose.model("otp", otpSchema);
