import nodemailer from "nodemailer";
import "dotenv/config";

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env;

const nodemailerConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587, // 25, 887, 2525, 465
  secure: true,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (payload: any): void => {
  const email = { ...payload, from: GOOGLE_EMAIL };
  transport.sendMail(email);
};

export default sendEmail;
