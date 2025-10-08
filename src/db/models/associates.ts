import User from "./User";
import Session from "./Session";
import Post from "./Post";
import Comment from "./Comment";
import Like from "./Like";
import Follow from "./Follow";
import Notification from "./Notification";

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

// Follow.belongsTo(User, {
//   foreignKey: "followerUserId",
//   as: "followerUser",
// });
// User.hasMany(Follow, {
//   foreignKey: "followerUserId",
//   as: "follows",
// });

// Follow.belongsTo(User, {
//   foreignKey: "targetUserId",
//   as: "targetUser",
// });
User.hasMany(Follow, {
  foreignKey: "targetUserId",
  as: "followers",
});

// User.hasOne(Notification, {
//   foreignKey: "authorUserId",
//   as: "authorUser",
// });
Notification.belongsTo(User, {
  foreignKey: "authorUserId",
  as: "authorUser",
});
User.hasOne(Notification, {
  foreignKey: "authorUserId",
  as: "authorUser",
});

Notification.belongsTo(Post, {
  foreignKey: "targetPostId",
  as: "targetPost",
});
User.hasOne(Notification, {
  foreignKey: "targetPostId",
  as: "targetPost",
});