import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (password1: string, password2: string) =>
  await bcrypt.compare(password1, password2);
