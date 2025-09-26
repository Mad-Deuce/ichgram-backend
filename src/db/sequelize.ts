import { Options, Sequelize } from "sequelize";

import configData from "./config/config";

const env: string = process.env.NODE_ENV || "development";
const config: Options | undefined = configData[env];

const sequelize: Sequelize = new Sequelize({ ...config });

export default sequelize;
