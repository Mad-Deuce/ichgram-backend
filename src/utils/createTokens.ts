import jwt from "jsonwebtoken";

const { JWT_SECRET = "secret" } = process.env;

export interface ITokens {
  confirmationToken: string;
  accessToken: string;
  refreshToken: string;
}

const createTokens = (payload: any): ITokens => {
  const confirmationToken: string = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "5m",
  });
  const accessToken: string = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken: string = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { confirmationToken, accessToken, refreshToken };
};

export default createTokens;
