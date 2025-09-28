import { DataTypes, Model } from "sequelize";

import sequelize from "../sequelize";

import {
  emailPattern,
} from "../../validation/patterns/auth.patterns";

export interface IUser {
  email: string;
  isVerified?: boolean;
  password: string;
  role?: string;
  fullname?: string;
  username?: string;
}

class User extends Model<IUser, IUser> {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: emailPattern.regexp,
          msg: emailPattern.message,
        },
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, 
    modelName: "user", 
  }
);

export default User;
