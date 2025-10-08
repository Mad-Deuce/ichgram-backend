import { DataTypes, Model } from "sequelize";

import sequelize from "../sequelize";

import { INotification } from "../../typescript/interfaces";
import NotificationTypes from "../../constants/NotificationTypes";

class Notification extends Model<INotification, INotification> {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    authorUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(NotificationTypes),
      allowNull: false,
    },
    targetUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    targetPostId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "notification",
  }
);

export default Notification;
