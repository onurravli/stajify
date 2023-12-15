import express from "express";
import routes from "./routes";
import cors from "cors";
import { createCompaniesTable, createUsersTable } from "./services/postgres.service";

createCompaniesTable();
createUsersTable();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routes.rootRouter);
app.use("/users", routes.usersRouter);
app.use("/companies", routes.companiesRouter);
app.use("*", routes.fallbackRouter);

app.listen(3000);
