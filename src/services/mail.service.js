let smtpHost = process.env.SMTP_HOST;
let smtpPort = process.env.SMTP_PORT;
import nodemailer from "nodemailer";
let USER, APP_PASSWORD, SMTPHOST, SMTPPORT;
let transporter;

const config = async (
  gmailId,
  googleAppPassword,
  smtpHost = "smtp.gmail.com",
  smtpPort = 465
) => {
  USER = gmailId;
  APP_PASSWORD = googleAppPassword;
  SMTPHOST = smtpHost;
  SMTPPORT = smtpPort;
  console.log(`Configuration successful!`);
  transporter = createTransporter();
};

const createTransporter = () => {
  try {
    if (!USER || !APP_PASSWORD) {
      throw new Error(
        "USER and APP_PASSWORD must be configured using config()"
      );
    }

    return nodemailer.createTransport({
      host: SMTPHOST,
      port: SMTPPORT,
      secure: true,
      auth: {
        user: USER,
        pass: APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const sendMail = async (
  sendTo,
  subject = "Sent using Mail Sender",
  content = "Test Email"
) => {
  try {
    if (!USER || !APP_PASSWORD) {
      throw new Error(
        "USER and APP_PASSWORD must be configured using config()"
      );
    }

    if (transporter) {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Attempting to connect to server: ${smtpHost} at PORT: ${smtpPort}`
          );
          console.log(`Server is ready to send emails from: ${USER}`);
        }
      });
    }

    transporter.sendMail(
      {
        from: USER,
        to: sendTo,
        subject: subject,
        html: content,
      },
      (err, info) => {
        if (!err) {
          console.log(`Mail sent successfully to ${sendTo} from ${USER}!`);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

export { sendMail, config };
