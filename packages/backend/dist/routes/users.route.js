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
const usersRouter = express_1.default.Router();
const postgres = services_1.default.postgres;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield postgres.query("SELECT * FROM users WHERE id=$1", [id]);
        return user.rows[0];
    }
    catch (err) {
        return null;
    }
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield postgres.query("SELECT * FROM users WHERE email=$1", [email]);
        return user.rows[0];
    }
    catch (err) {
        return null;
    }
});
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield postgres.query("SELECT * FROM users");
        return resp.rows.length != 0
            ? res.json(resp.rows)
            : res.json({
                message: "No users found.",
            });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield getUserById(id);
    if (!user) {
        return res.status(404).json({
            error: "User not found with this ID.",
        });
    }
    try {
        const resp = yield postgres.query("SELECT * FROM users WHERE id=$1", [id]);
        return res.json(resp.rows[0]);
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
usersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, phone, email, password } = yield req.body;
    if (!name || !surname || !phone || !email || !password) {
        return res.status(400).json({
            error: "Required fields are missing.",
            errorPrintable: "Gerekli alanlar eksik.",
        });
    }
    try {
        const uuid = (0, uuid_1.v4)();
        const hashedPassword = yield hashPassword(password);
        const is_verified = false;
        yield postgres.query("INSERT INTO users (id, name, surname, phone, email, password, is_verified) VALUES ($1, $2, $3, $4, $5, $6, $7)", [uuid, name, surname, phone, email, hashedPassword, is_verified]);
        return res.status(201).json({
            message: "User created successfully.",
            messagePrintable: "Kullanıcı başarıyla oluşturuldu.",
        });
    }
    catch (err) {
        return res.status(409).json({
            error: "User with this email already exists.",
            errorPrintable: "Bu e-posta ile kayıtlı kullanıcı zaten var.",
        });
    }
}));
usersRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield getUserById(id);
    if (!user) {
        return res.status(404).json({
            error: "User not found with this ID.",
        });
    }
    const { name, surname, phone, email, password } = req.body;
    if (!name || !surname || !phone || !email || !password) {
        return res.status(400).json({
            error: "Required fields are missing.",
        });
    }
    try {
        const hashedPassword = yield hashPassword(password);
        yield postgres.query("UPDATE users SET name=$1, surname=$2, phone=$3, email=$4, password=$5 WHERE id=$6", [
            name,
            surname,
            phone,
            email,
            hashedPassword,
            id,
        ]);
        return res.json({
            message: "User updated successfully.",
        });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
usersRouter.put("/verify/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            error: "An ID is required for this action.",
        });
    }
    const user = yield getUserById(id);
    if (!user) {
        return res.status(404).json({
            error: "User not found with this ID.",
        });
    }
    try {
        yield postgres.query("UPDATE users SET is_verified=$1 WHERE id=$2", [true, id]);
        return res.json({
            message: "User verified successfully.",
        });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
usersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            error: "An ID is required for this action.",
        });
    }
    const user = yield getUserById(id);
    if (!user) {
        return res.status(404).json({
            error: "User not found with this ID.",
        });
    }
    try {
        const resp = yield postgres.query("DELETE FROM users WHERE id=$1", [id]);
        return res.json({
            message: "User deleted successfully.",
        });
    }
    catch (err) {
        (0, postgres_service_1.handleErrors)(err, res);
    }
}));
usersRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "Required fields are missing.",
            errorPrintable: "Gerekli alanlar eksik.",
        });
    }
    const user = yield getUserByEmail(email);
    if (!user) {
        return res.status(404).json({
            error: "User not found with this email.",
            errorPrintable: "Bu e-posta ile kayıtlı kullanıcı bulunamadı.",
        });
    }
    const passwordInDb = user.password;
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, passwordInDb);
    if (!isPasswordCorrect) {
        return res.status(401).json({
            error: "Incorrect password.",
            errorPrintable: "Hatalı şifre.",
        });
    }
    return res.json({}); // TODO - Implement login
}));
exports.default = usersRouter;
//# sourceMappingURL=users.route.js.map