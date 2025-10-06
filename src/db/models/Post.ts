import { DataTypes, Model } from "sequelize";

import sequelize from "../sequelize";

import { IPost } from "../../typescript/interfaces";
import Comment from "./Comment";
import Like from "./Like";

class Post extends Model<IPost, IPost> {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalComments: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return (this.get("comments") as Comment[]).length;
      },
    },
    totalLikes: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return (this.get("likes") as Like[]).length;
      },
    },
  },
  {
    sequelize,
    modelName: "post",
  }
);

export default Post;
