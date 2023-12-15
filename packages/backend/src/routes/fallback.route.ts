import express, { Router, Request, Response } from "express";

const fallbackRouter: Router = express.Router();

fallbackRouter.get("*", (req: Request, res: Response) => {
  res.redirect("/");
});

export default fallbackRouter;
