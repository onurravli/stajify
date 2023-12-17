"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rootRouter = express_1.default.Router();
rootRouter.get("/", (req, res) => {
    res.json({
        routes: [
            {
                path: "/",
                name: "root",
            },
            {
                path: "/users",
                name: "users",
            },
            {
                path: "/companies",
                name: "companies",
            },
        ],
    });
});
exports.default = rootRouter;
//# sourceMappingURL=root.route.js.map