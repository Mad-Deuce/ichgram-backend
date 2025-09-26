import { DataTypes } from "sequelize";

import sequelize from "../sequelize";

const Role = sequelize.define("role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Role;
