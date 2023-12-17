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
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPasswordMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the request body contains a password
        if (req.body && req.body.password) {
            const password = req.body.password;
            // Hash the password using bcrypt
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Replace the plain text password with the hashed password in the request body
            req.body.password = hashedPassword;
        }
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle any errors that occur during password hashing
        console.error("Error hashing password:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
});
exports.default = hashPasswordMiddleware;
//# sourceMappingURL=password.js.map