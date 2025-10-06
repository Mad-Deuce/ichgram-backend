import User from "./User";
import Session from "./Session";
import Post from "./Post";
import Comment from "./Comment";
import Like from "./Like";

Session.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasOne(Session, {
  foreignKey: "userId",
  as: "session",
});


Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasOne(Comment, {
  foreignKey: "userId",
  as: "comments",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});
Post.hasMany(Comment, {
  foreignKey: "postId",
  as: "comments",
});


Like.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasOne(Like, {
  foreignKey: "userId",
  as: "likes",
});

Like.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});
Post.hasMany(Like, {
  foreignKey: "postId",
  as: "likes",
});