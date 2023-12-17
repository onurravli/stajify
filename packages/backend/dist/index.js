"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const postgres_service_1 = require("./services/postgres.service");
const dotenv_1 = require("dotenv");
(0, postgres_service_1.tryToConnect)().catch((err) => {
    return "Couldn't connect to DB.";
});
(0, postgres_service_1.createCompaniesTable)();
(0, postgres_service_1.createUsersTable)();
const app = (0, express_1.default)();
const env = (0, dotenv_1.config)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", routes_1.default.rootRouter);
app.use("/users", routes_1.default.usersRouter);
app.use("/companies", routes_1.default.companiesRouter);
app.use("*", routes_1.default.fallbackRouter);
app.listen(port, () => {
    console.log(`Server running on ${port}.`);
});
//# sourceMappingURL=index.js.map