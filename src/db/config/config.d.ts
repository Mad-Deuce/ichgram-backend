import { Options } from "sequelize";

declare const configData: {
  [env: string]: Options;
};

export default configData;
