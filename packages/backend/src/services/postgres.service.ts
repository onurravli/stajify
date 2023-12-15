import { Pool } from "pg";
import * as dotenv from "dotenv";
import { Response } from "express";

export enum error_codes {
  "42P01" = "Table doesn't exist.",
  "22P02" = "Invalid query.",
}

export const handleErrors = (err: any, res: Response) => {
  switch ((err as { code: string }).code) {
    case "42P01":
      return res.status(404).json({
        error: error_codes["42P01"],
        error_code: (err as { code: string }).code,
      });
    case "22P02":
      return res.status(404).json({
        error: error_codes["22P02"],
        error_code: (err as { code: string }).code,
      });
    default:
      return res.status(500).json({
        error: err,
      });
  }
};

const env = dotenv.config();

const postgres = new Pool({
  host: process.env.PG_HOSTNAME as string,
  user: process.env.PG_USERNAME as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_DATABASE as string,
});

const createUsersTable = async () => {
  try {
    await postgres.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);
  } catch (error) {
    console.log(`An error occurred while initializing the Users table. (${error})`);
  }
};

const createCompaniesTable = async () => {
  try {
    await postgres.query(`
    CREATE TABLE IF NOT EXISTS companies (
      id UUID PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      province VARCHAR(255) NOT NULL
    )
    `);
  } catch (error) {
    console.log(`An error occurred while initializing the Companies table. (${error})`);
  }
};

process.on("exit", async () => {
  console.log("Closing Postgres connection.");
  await postgres.end();
  process.exit(0);
});

export { createCompaniesTable, createUsersTable };
export default postgres;
