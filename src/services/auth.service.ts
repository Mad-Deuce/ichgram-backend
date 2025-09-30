import jwt from "jsonwebtoken";
import { Model, Transaction } from "sequelize";

import sequelize from "../db/sequelize";

import HttpError from "../typescript/classes/HttpError";
import sendEmail from "../utils/sendEmail";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import createTokens, { ITokens } from "../utils/createTokens";

import { IUser } from "../typescript/interfaces";
import User from "../db/models/User";
import Session from "../db/models/Session";

const { FRONTEND_BASE_URL, JWT_SECRET = "secret" } = process.env;

enum emailTypes {
  VERIFY = "verify",
  RESET = "reset",
}

const sendConfirmationEmail = (
  email: string,
  type: emailTypes = emailTypes.VERIFY
) => {
  const { confirmationToken }: ITokens = createTokens({
    email,
  });

  const verifyEmail = {
    to: email,
    subject: `${type} email`,
    html: `<a href="${FRONTEND_BASE_URL}/auth/${type}?token=${confirmationToken}" target="_blank">Confirm email</a>`,
  };
  sendEmail(verifyEmail);
};

export const signupUser = async (payload: IUser): Promise<string> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const { password, email }: IUser = payload;
    const passwordHash: string = await hashPassword(password);

    await User.create(
      {
        ...payload,
        password: passwordHash,
      },
      { transaction }
    );

    sendConfirmationEmail(email);

    await transaction.commit();
    return email;
  } catch (error: any) {
    await transaction.rollback();
    throw error;
  }
};

export const confirmEmail = async (user: User): Promise<void> => {
  await user.update({ isVerified: true });
};

export const loginUser = async (email: string, loginPassword: string) => {
  const user: User | null = await User.findOne({ where: { email } });
  if (!user) throw new HttpError(404, "Email or password invalid");
  const { id, isVerified, password, fullname, username }: IUser = user.toJSON();

  if (!(await comparePassword(loginPassword, password)))
    throw new HttpError(404, "Email or password invalid");

  if (!isVerified) {
    sendConfirmationEmail(email);
    throw new HttpError(
      403,
      `Email not confirmed, a message containing a confirmation link has been sent to email: ${email}`
    );
  }

  await Session.destroy({ where: { userId: id } });

  const { accessToken, refreshToken }: ITokens = createTokens({ email });

  await Session.create({ userId: id, accessToken, refreshToken });

  return {
    user: { id, email, fullname, username },
    accessToken,
    refreshToken,
  };
};

export const refreshTokens = async (
  currentRefreshToken: string | undefined
) => {
  if (!currentRefreshToken) throw new HttpError(401, "RefreshToken not found");

  try {
    jwt.verify(currentRefreshToken, JWT_SECRET);
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }

  const session: (Session & { user?: User }) | null = await Session.findOne({
    where: { refreshToken: currentRefreshToken },
    include: { model: User, as: "user" },
  });
  if (!session) throw new HttpError(401, "Session not found");

  const user: IUser | undefined = session.user?.toJSON();
  if (!user) throw new HttpError(401, "User not found");

  const { email } = user;

  const { accessToken, refreshToken } = createTokens({ email });

  await session.update({ accessToken, refreshToken });

  return {
    accessToken,
    refreshToken,
  };
};

export const resetPassword = async (email: string) => {
  const user: User | null = await User.findOne({
    where: { email },
  });
  if (!user) throw new HttpError(404, "User not found");
  sendConfirmationEmail(email, emailTypes.RESET);
  await Session.destroy({ where: { userId: user.get("id") as number } });
};

export const updatePassword = async (user: User, newPassword: string) => {
  if (await comparePassword(newPassword, String(user.get("password"))))
    throw new HttpError(409, "Old and new passwords must not match");

  const passwordHash = await hashPassword(newPassword);
  await user.update({ password: passwordHash });
  await Session.destroy({ where: { userId: user.get("id") as number } });
};

export const logoutUser = async (user: User) => {
  await Session.destroy({ where: { userId: user.get("id") as number } });
};
