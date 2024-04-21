import nodemailer from "nodemailer";
import "dotenv/config";
// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.UserMail,
    pass: process.env.userPass,
  },
});

// Send the email
export const sendConfirmationMail = (verificationCode, email) => {
  transporter.sendMail(
    {
      from: "haithemfarjallah2002@gmail.com",
      to: email,
      subject: "Verification Code for Account Confirmation",
      html: `<p style="font-size: 18px;">Your verification code is: <strong>${verificationCode}</strong></p>
             <p style="font-size: 15px; ">Make sure  not to share this code with anyone.</p>`,
    },
    (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};
export const sendVerificationPass = (recoverCode, email) => {
  transporter.sendMail(
    {
      from: "haithemfarjallah2002@gmail.com",
      to: email,
      subject: "Verification Code for Changing Password",
      html: `<p style="font-size: 15px; ">Here is the Link to change your password :</p>
      <a href="https://book-store-backend-mu.vercel.app/recoverPassword/${recoverCode}"> Click Here !</a>`,
    },
    (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};
