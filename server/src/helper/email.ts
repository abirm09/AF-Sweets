import nodemailer from "nodemailer";
import { SMTPPassword, SMTPUserName } from "../secret";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SMTPUserName,
    pass: SMTPPassword,
  },
});

export const sendEmailWithNodeMailer = async (emailData: {
  email: string;
  subject: string;
  html: string;
}) => {
  try {
    const mailsOptions = {
      from: SMTPUserName,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    await transporter.sendMail(mailsOptions);
  } catch (error) {
    throw error;
  }
};
