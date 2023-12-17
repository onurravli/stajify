"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_route_1 = __importDefault(require("./root.route"));
const fallback_route_1 = __importDefault(require("./fallback.route"));
const users_route_1 = __importDefault(require("./users.route"));
const companies_route_1 = __importDefault(require("./companies.route"));
exports.default = {
    rootRouter: root_route_1.default,
    fallbackRouter: fallback_route_1.default,
    usersRouter: users_route_1.default,
    companiesRouter: companies_route_1.default,
};
//# sourceMappingURL=index.js.map