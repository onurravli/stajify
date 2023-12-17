"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fallbackRouter = express_1.default.Router();
fallbackRouter.get("*", (req, res) => {
    res.redirect("/");
});
exports.default = fallbackRouter;
//# sourceMappingURL=fallback.route.js.map