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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersTable = exports.createCompaniesTable = exports.tryToConnect = exports.handleErrors = exports.error_codes = void 0;
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
var error_codes;
(function (error_codes) {
    error_codes["42P01"] = "Table doesn't exist.";
    error_codes["22P02"] = "Invalid query.";
})(error_codes || (exports.error_codes = error_codes = {}));
const handleErrors = (err, res) => {
    switch (err.code) {
        case "42P01":
            return res.status(404).json({
                error: error_codes["42P01"],
                error_code: err.code,
            });
        case "22P02":
            return res.status(404).json({
                error: error_codes["22P02"],
                error_code: err.code,
            });
        default:
            return res.status(500).json({
                error: err,
            });
    }
};
exports.handleErrors = handleErrors;
const env = dotenv.config();
const postgres = new pg_1.Pool({
    host: process.env.PG_HOSTNAME,
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});
const tryToConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield postgres.query("SELECT version()");
        return resp;
    }
    catch (err) {
        return null;
    }
});
exports.tryToConnect = tryToConnect;
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postgres.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN NOT NULL
      );
    `);
    }
    catch (error) {
        console.log(`An error occurred while initializing the Users table. (${error})`);
    }
});
exports.createUsersTable = createUsersTable;
const createCompaniesTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postgres.query(`
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
    }
    catch (error) {
        console.log(`An error occurred while initializing the Companies table. (${error})`);
    }
});
exports.createCompaniesTable = createCompaniesTable;
process.on("exit", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Closing Postgres connection.");
    yield postgres.end();
    process.exit(0);
}));
exports.default = postgres;
//# sourceMappingURL=postgres.service.js.map