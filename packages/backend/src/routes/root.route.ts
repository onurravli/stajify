import express, { Router, Request, Response } from "express";

const rootRouter: Router = express.Router();

rootRouter.get("/", (req: Request, res: Response) => {
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

export default rootRouter;
