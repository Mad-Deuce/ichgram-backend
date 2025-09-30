import { DataTypes, Model } from "sequelize";

import sequelize from "../sequelize";

import { IUser } from "../../typescript/interfaces";
import Roles from "../../constants/Roles";

import { emailPattern } from "../../validation/patterns/auth.patterns";

class User extends Model<IUser, IUser> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
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
      type: DataTypes.ENUM,
      values: Object.values(Roles),
      allowNull: false,
      defaultValue: Roles.USER,
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
