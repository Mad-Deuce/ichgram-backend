import jwt, { JwtPayload } from "jsonwebtoken";
import { Model } from "sequelize";

import HttpError from "../typescript/classes/HttpError";
import sendEmail from "../utils/sendEmail";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import createTokens from "../utils/createTokens";

import User from "../db/models/User";
import Session from "../db/models/Session";
import Role from "../db/models/Role";

const { BASE_URL, FRONTEND_BASE_URL, JWT_SECRET = "secret" } = process.env;

export const getAllUsers = async () => {
  return await User.findAll({
    include: [
      { model: Role, as: "role" },
      { model: Session, as: "session" },
    ],
  });
};

export const deleteUser = async (user: User) => {
  const email: string = user.get("email") as string;
  const { confirmationToken } = createTokens({ email });

  const verifyEmail = {
    to: email,
    subject: "Confirm account delete",
    html: `<a href="${BASE_URL}/api/users/delete?token=${confirmationToken}" target="_blank">Confirm account delete</a>`,
  };

  await sendEmail(verifyEmail);
};

export const confirmDeleteUser = async (token: any) => {
  try {
    const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
    let email: string;
    if (typeof decoded === "object" && "email" in decoded) {
      email = decoded.email;
    } else {
      throw new HttpError(401, "Invalid token payload");
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    await user.destroy();
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export const updatePublicData = async (user: Model, newUserData: any) => {
  if (newUserData.password) {
    newUserData.password = await hashPassword(newUserData.password);
  }
  if (!user) throw new HttpError(404, "User not found");

  if (await comparePassword(newUserData.password, String(user.get("password"))))
    throw new HttpError(401, "Old and new passwords must not match");

  delete newUserData.email;
  delete newUserData.roleId;
  await user.update({ ...newUserData });

  const { id, email, fullname, username } = user.toJSON();
  const session: any = user.get("session");

  const { accessToken, refreshToken } = createTokens({ email });
  session.update({ accessToken, refreshToken });

  return {
    user: {
      id,
      email,
      fullname,
      username,
    },
    accessToken,
    refreshToken,
  };
};

export const sendConfirmationMessageToCurrentEmail = async (
  user: any,
  newEmail: string
) => {
  const { email } = user;
  const { confirmationToken } = createTokens({ email });

  const verifyEmail = {
    to: email,
    subject: "Confirm email change",
    html: `<a href="${BASE_URL}/api/users/email?token=${confirmationToken}&new_email=${newEmail}" target="_blank">Confirm change email address to ${newEmail}</a>`,
  };

  await sendEmail(verifyEmail);
};

export const sendConfirmationMessageToNewEmail = async (
  user: any,
  newEmail: any
) => {
  if (!newEmail) throw new HttpError(400, "New email not found");

  const { email } = user;
  const { confirmationToken } = createTokens({ email });

  const verifyNewEmail = {
    to: newEmail,
    subject: "Confirm new email",
    html: `<a href="${BASE_URL}/api/users/new-email?token=${confirmationToken}&new_email=${newEmail}" target="_blank">Confirm new email</a>`,
  };

  await sendEmail(verifyNewEmail);
};

export const updateEmail = async (user: any, newEmail: any) => {
  if (!newEmail) throw new HttpError(400, "New email not found");
  await user.update({ email: newEmail });
};

export const updateRole = async (userId: any, newRole: string) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new HttpError(404, `User wit id: ${userId} not found`);
  }
  const role = await Role.findOne({ where: { name: newRole } });
  if (!role) {
    throw new HttpError(404, `Role: ${newRole} not found`);
  }

  // await user.update({ roleId: role.get("id") });
};
