import { Pool } from "pg";
import { Response } from "express";
export declare enum error_codes {
    "42P01" = "Table doesn't exist.",
    "22P02" = "Invalid query."
}
export declare const handleErrors: (err: any, res: Response) => Response<any, Record<string, any>>;
declare const postgres: Pool;
export declare const tryToConnect: () => Promise<import("pg").QueryResult<any> | null>;
declare const createUsersTable: () => Promise<void>;
declare const createCompaniesTable: () => Promise<void>;
export { createCompaniesTable, createUsersTable };
export default postgres;
//# sourceMappingURL=postgres.service.d.ts.map