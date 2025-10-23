import "dotenv/config"

export default {
  "development": {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialect: "postgres",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    username: process.env.PROD_DATABASE_USER,
    password: process.env.PROD_DATABASE_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    host: process.env.PROD_DATABASE_HOST,
    port: Number(process.env.PROD_DATABASE_PORT),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Enable SSL
        rejectUnauthorized: false // Adjust based on your SSL certificate setup
      }
    },
  }
}
