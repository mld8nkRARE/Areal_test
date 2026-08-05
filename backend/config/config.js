require("dotenv").config();

const baseConfig = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "postgres"
}
module.exports = {
  development: baseConfig,
  test: baseConfig,
  production: baseConfig,
};

