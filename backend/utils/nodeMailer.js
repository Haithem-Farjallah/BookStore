import nodemailer from "nodemailer";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "haithemfarjallah2002@gmail.com",
    pass: "ojmbvdldzhvlypwo",
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