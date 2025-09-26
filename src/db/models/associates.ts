import User from "./User";
import Role from "./Role";
import Session from "./Session";

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

Session.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasOne(Session, {
  foreignKey: "userId",
  as: "session",
});

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});
