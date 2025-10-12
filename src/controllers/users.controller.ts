import { Request, Response } from "express";
import { setAuthCookies, clearAuthCookies } from "../utils/setupAuthCookies";

import {
  getAllUsers,
  deleteUser,
  confirmDeleteUser,
  updatePublicData,
  sendConfirmationMessageToCurrentEmail,
  sendConfirmationMessageToNewEmail,
  updateEmail,
  findByUsername,
  getUserById,
} from "../services/users.service";
import { IAuthRequest, IUser } from "../typescript/interfaces";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(201).json(users);
};

export const deleteController = async (req: Request, res: Response) => {
  await deleteUser((req as IAuthRequest).user);
  clearAuthCookies(res);
  res.json({
    message: `Confirm account delete, a message containing a confirmation link has been sent to email: ${(
      req as IAuthRequest
    ).user.get("email")}`,
  });
};

export const confirmDeleteController = async (req: Request, res: Response) => {
  await confirmDeleteUser(req.query.token);
  res.json({ message: "Account successfully deleted" });
};

export const updatePublicDataController = async (
  req: Request,
  res: Response
) => {
  
  const user: IUser = await updatePublicData((req as IAuthRequest).user, {...req.body, avatar: req.file?.filename});
  res.json({ message: "User data successfully updated", user });
};

export const updateEmailController = async (req: Request, res: Response) => {
  sendConfirmationMessageToCurrentEmail(
    (req as IAuthRequest).user,
    req.body.email
  );
  clearAuthCookies(res);
  res.json({
    message: `Confirm email change, a message containing a confirmation link has been sent to email: ${(
      req as IAuthRequest
    ).user.get("email")}`,
  });
};

export const confirmCurrentEmailController = async (
  req: Request,
  res: Response
) => {
  sendConfirmationMessageToNewEmail(
    (req as IAuthRequest).user,
    req.query.new_email
  );
  clearAuthCookies(res);
  res.json({
    message: `Confirm new email, a message containing a confirmation link has been sent to email: ${req.query.new_email}`,
  });
};

export const confirmNewEmailController = async (
  req: Request,
  res: Response
) => {
  updateEmail((req as IAuthRequest).user, req.query.new_email);
  clearAuthCookies(res);
  res.json({
    message: `Email has been updated`,
  });
};

export const findUsersByUsernameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users: IUser[] = await findByUsername(req.query.username as string);
  res.status(200).json({
    message: `Request successfully processed`,
    users,
  });
};

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user: IUser = await getUserById(
    Number.parseInt(req.params.id as string),
    Number((req as IAuthRequest).user.get("id"))
  );
  res.status(200).json({
    message: `Request successfully processed`,
    user,
  });
};
