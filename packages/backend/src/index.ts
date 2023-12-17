import express from "express";
import routes from "./routes";
import cors from "cors";
import { createCompaniesTable, createUsersTable, tryToConnect } from "./services/postgres.service";
import { config } from "dotenv";

tryToConnect().catch((err) => {
  return "Couldn't connect to DB.";
});

createCompaniesTable();
createUsersTable();

const app = express();
const env = config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/", routes.rootRouter);
app.use("/users", routes.usersRouter);
app.use("/companies", routes.companiesRouter);
app.use("*", routes.fallbackRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
