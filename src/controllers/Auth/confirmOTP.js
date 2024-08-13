import { Otp } from "../../models/otp.model.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const confirmOTP = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing!"));
    }

    const exists = await User.findOne({ email });

    if (!exists) {
      return res
        .status(400)
        .send(
          new ApiResponse(400, null, "User with provided email does not exist!")
        );
    }

    const exist = await Otp.findOne({ email });

    if (!exist) {
      return res
        .status(400)
        .send(
          new ApiResponse(400, null, "Kindly request an OTP before verifying!")
        );
    }
    if (code !== exist.code) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const at = exists.generateAccessToken();
    const rt = exists.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    res.status(200).json({
      message: "User Logged in Successfully",
      accessToken: at,
      refreshToken: rt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "error"));
  }
};
export { confirmOTP };
