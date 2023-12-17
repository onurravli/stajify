import express from "express";
import routes from "./routes";
import cors from "cors";
import { createCompaniesTable, createUsersTable, tryToConnect } from "./services/postgres.service";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

tryToConnect().catch((err) => {
  return "Couldn't connect to DB.";
});

createCompaniesTable();
createUsersTable();

const app = express();
const env = dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes.rootRouter);
app.use("/users", routes.usersRouter);
app.use("/companies", routes.companiesRouter);
app.use("*", routes.fallbackRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
