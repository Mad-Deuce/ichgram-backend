import User from "../db/models/User";
import Session from "../db/models/Session";

export const getAllSessions = async () => {
  return await Session.findAll({
    include: { model: User, as: "user" },
  });
};
