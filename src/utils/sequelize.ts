import { Sequelize, DataTypes, Model } from "sequelize";
import * as pg from "pg";
import Error from "next/error";
import LOGGER from "./logger";

const sequelize = new Sequelize(
  "crispyRead",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

function initialize() {
  try {
    LOGGER.info("Establishing connection");
    sequelize.authenticate();
    LOGGER.info("Established connection");
    sequelize.sync();
  } catch (err: any) {
    LOGGER.error("Connection failed", err);
  }
}
initialize();
export { sequelize, DataTypes, Model };
