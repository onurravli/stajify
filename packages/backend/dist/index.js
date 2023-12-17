"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const postgres_service_1 = require("./services/postgres.service");
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
(0, postgres_service_1.tryToConnect)().catch((err) => {
    return "Couldn't connect to DB.";
});
(0, postgres_service_1.createCompaniesTable)();
(0, postgres_service_1.createUsersTable)();
const app = (0, express_1.default)();
const env = dotenv.config();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", routes_1.default.rootRouter);
app.use("/users", routes_1.default.usersRouter);
app.use("/companies", routes_1.default.companiesRouter);
app.use("*", routes_1.default.fallbackRouter);
app.listen(port, () => {
    console.log(`Server running on ${port}.`);
});
//# sourceMappingURL=index.js.map