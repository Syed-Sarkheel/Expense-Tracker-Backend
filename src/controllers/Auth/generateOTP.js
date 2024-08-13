import OTP from "otp-generator-random";
import { config, sendMail } from "../../services/mail.service.js";
import { User } from "../../models/user.model.js";
import { Otp } from "../../models/otp.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing!"));
    }

    const exists = await User.findOne({ email });

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "User with provided email does not exist!")
        );
    }

    const exist = await Otp.findOne({ email });

    const otp1 = OTP(6);

    await config(process.env.MAIL_USER, process.env.MAIL_PASS);
    await sendMail(email, "OTP", `Your OTP IS ${otp1}`);

    if (exist) {
      exist.code = otp1;
      await exist.save();
    } else {
      const otp = await Otp.create({
        email,
        code: otp1,
      });
    }

    res
      .status(200)
      .send(new ApiResponse(200, otp1, "Otp generated sucessfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error"));
  }
};
export { generateOTP };
