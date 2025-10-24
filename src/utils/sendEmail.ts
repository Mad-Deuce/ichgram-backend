import nodemailer from "nodemailer";
import "dotenv/config";

import HttpError from "../typescript/classes/HttpError";

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

const sendEmail = async (payload: any): Promise<void> => {
  const email = { ...payload, from: GOOGLE_EMAIL };
  try {
    await transport.sendMail(email);
  } catch (error) {
    new HttpError(500, `Error while sending mail: ${error}`);
  }
};

export default sendEmail;
