import { DataTypes, Model } from "sequelize";

import sequelize from "../sequelize";
import User from "./User";

import { IUser } from "./User";

export interface ISession {
  userId: number;
  accessToken: string;
  refreshToken?: string;
  user?: IUser;
}

class Session extends Model<ISession, ISession> {
  declare userId: number;
}

Session.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "session",
  }
);

export default Session;
