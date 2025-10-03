import User from "./User";
import Session from "./Session";
import Post from "./Post";

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