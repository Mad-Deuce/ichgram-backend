import { Sequelize } from "sequelize";

import configData from "./config/config";

const env = process.env.NODE_ENV || "development";
const config = configData[env];

const sequelize = new Sequelize({...config} );

export default sequelize;
