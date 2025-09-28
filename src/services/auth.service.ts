import jwt from "jsonwebtoken";
import { Model, Transaction } from "sequelize";

import sequelize from "../db/sequelize";

import HttpError from "../utils/HttpError";
import sendEmail from "../utils/sendEmail";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import createTokens, { ITokens } from "../utils/createTokens";

import User, { IUser } from "../db/models/User";
import Session from "../db/models/Session";

const { FRONTEND_BASE_URL, JWT_SECRET = "secret" } = process.env;

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

    const { confirmationToken }: ITokens = createTokens({
      email,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a href="${FRONTEND_BASE_URL}/confirm?token=${confirmationToken}" target="_blank">Confirm email</a>`,
    };
    sendEmail(verifyEmail);

    await transaction.commit();
    return email;
  } catch (error: any) {
    await transaction.rollback();
    throw error;
  }
};

export const confirmEmail = async (user: Model) => {
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  await user.update({ isVerified: true });
};

export const loginUser = async (email: string, loginPassword: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new HttpError(401, "Email or password invalid");
  // const { id, verified, password, fullname, username } = user.toJSON();

  // if (!(await comparePassword(loginPassword, password)))
  //   throw new HttpError(401, "Email or password invalid");

  // if (!verified) throw new HttpError(403, "Email not confirmed");

  // await Session.destroy({ where: { userId: id } });

  const { accessToken, refreshToken } = createTokens({ email });

  // await Session.create({ userId: id, accessToken, refreshToken });

  return {
    // user: { id, email, fullname, username },
    accessToken,
    refreshToken,
  };
};

export const refreshTokens = async (
  currentRefreshToken: string | undefined
) => {
  try {
    if (!currentRefreshToken)
      throw new HttpError(401, "RefreshToken not found");
    jwt.verify(currentRefreshToken, JWT_SECRET);

    const session = await Session.findOne({
      where: { refreshToken: currentRefreshToken },
      include: { model: User, as: "user" },
    });
    if (!session) throw new HttpError(401, "Session not found");

    const { user } = session.toJSON();
    if (!user) throw new HttpError(401, "User not found");
    const { id, email, fullname, username } = user;

    const { accessToken, refreshToken } = createTokens({ email });

    await session.update({ accessToken, refreshToken });

    return {
      user: { id, email, fullname, username },
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export const logoutUser = async (id: number) => {
  await Session.destroy({ where: { userId: id } });
};

export const resetUserPassword = async (email: any) => {
  const user = await User.findOne({
    where: { email },
  });
  if (!user) throw new HttpError(404, "User not found");

  const { confirmationToken } = createTokens({ email });

  const verifyEmail = {
    to: email,
    subject: "Confirm reset password",
    html: `<a href="${FRONTEND_BASE_URL}/api/auth/reset-password?token=${confirmationToken}" target="_blank">Confirm reset password</a>`,
  };
  await sendEmail(verifyEmail);
};

export const confirmResetPassword = async (
  user: Model,
  newPassword: string
) => {
  if (await comparePassword(newPassword, String(user.get("password"))))
    throw new HttpError(401, "Old and new passwords must not match");

  const passwordHash = await hashPassword(newPassword);
  await user.update({ password: passwordHash });
  await Session.destroy({ where: { userId: user.get("id") } });
};
