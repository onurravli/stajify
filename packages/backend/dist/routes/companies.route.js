"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = __importDefault(require("../services"));
const postgres_service_1 = require("../services/postgres.service");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const companiesRouter = express_1.default.Router();
const postgres = services_1.default.postgres;
const getCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield postgres.query("SELECT * FROM companies WHERE id=$1", [id]);
        return company.rows[0];
    }
    catch (err) {
        return null;
    }
});
companiesRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield postgres.query("SELECT * FROM companies");
        return resp.rows.length != 0
            ? res.json(resp.rows)
            : res.json({
                message: "No companies found.",
            });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
companiesRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const company = yield getCompany(id);
    if (!company) {
        return res.status(404).json({
            error: "Company not found with this ID.",
        });
    }
    try {
        const resp = yield postgres.query("SELECT * FROM companies WHERE id=$1", [id]);
        return res.json(resp.rows[0]);
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
companiesRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, password, city, province } = yield req.body;
    if (!name || !phone || !email || !password || !city || !province) {
        return res.status(400).json({
            error: "Required fields are missing.",
        });
    }
    try {
        const uuid = (0, uuid_1.v4)();
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield postgres.query("INSERT INTO companies (id, name, phone, email, password, city, province) VALUES ($1, $2, $3, $4, $5, $6, $7)", [uuid, name, phone, email, hashedPassword, city, province]);
        return res.status(201).json({
            message: "Company created successfully.",
        });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
companiesRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const company = yield getCompany(id);
    if (!company) {
        return res.status(404).json({
            error: "Company not found with this ID.",
        });
    }
    const { name, phone, email, password, city, province } = yield req.body;
    if (!name || !phone || !email || !password || !city || !province) {
        return res.status(400).json({
            error: "Required fields are missing.",
        });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield postgres.query("UPDATE companies SET name=$1, phone=$2, email=$3, password=$4, city=$5, province=$6 WHERE id=$7", [name, phone, email, hashedPassword, city, province, id]);
        return res.json({
            message: "Company updated successfully.",
        });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
companiesRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            error: "An ID is required for this method.",
        });
    }
    const company = yield getCompany(id);
    if (!company) {
        return res.status(404).json({
            error: "Company not found with this ID.",
        });
    }
    try {
        const resp = yield postgres.query("DELETE FROM companies WHERE id=$1", [id]);
        return res.json({
            message: "Company deleted successfully.",
        });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
exports.default = companiesRouter;
//# sourceMappingURL=companies.route.js.map