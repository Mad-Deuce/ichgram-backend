import User from "./User";
import Session from "./Session";
import Post from "./Post";
import Comment from "./Comment";

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