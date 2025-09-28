import { DataTypes } from "sequelize";

import sequelize from "../sequelize";

/**
 * @deprecated The model should not be used
 */
const Role = sequelize.define("role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Role;
