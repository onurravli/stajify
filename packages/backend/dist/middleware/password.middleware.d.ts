import { Request, Response, NextFunction } from "express";
declare const hashPasswordMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default hashPasswordMiddleware;
//# sourceMappingURL=password.middleware.d.ts.map