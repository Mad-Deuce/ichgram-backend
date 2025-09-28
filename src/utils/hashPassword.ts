import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (
  password1: string,
  password2: string
): Promise<Boolean> => await bcrypt.compare(password1, password2);
