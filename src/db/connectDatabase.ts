import sequelize from "./sequelize";
import "./models/associates";

const connectDatabase = async (): Promise<void> => {

  try {
    await sequelize.authenticate();
    console.log(
      "--- Connection to the database has been established successfully. ---"
    );
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`);
  }
};

export default connectDatabase;
