import { DataTypes, Model } from "sequelize";

import sequelize from "../sequelize";

import { ISession } from "../../typescript/interfaces";

class Session extends Model<ISession, ISession> {}

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
