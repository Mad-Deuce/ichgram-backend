import User from "../db/models/User";
import Role from "../db/models/Role";

export const getAllRoles = async () => {
  return await Role.findAll({
    include: { model: User, as: "users" },
  });
};


