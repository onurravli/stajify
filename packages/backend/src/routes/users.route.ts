import express, { Router, Request, Response } from "express";
import services from "../services";
import { handleErrors } from "../services/postgres.service";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const usersRouter: Router = express.Router();
const postgres = services.postgres;

const getUser = async (id: string) => {
  try {
    const user = await postgres.query("SELECT * FROM users WHERE id=$1", [id]);
    return user.rows[0];
  } catch (err) {
    return null;
  }
};

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const resp = await postgres.query("SELECT * FROM users");
    return resp.rows.length != 0
      ? res.json(resp.rows)
      : res.json({
          message: "No users found.",
        });
  } catch (err) {
    handleErrors(err, res);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (!user) {
    return res.status(404).json({
      error: "User not found with this ID.",
    });
  }
  try {
    const resp = await postgres.query("SELECT * FROM users WHERE id=$1", [id]);
    return res.json(resp.rows[0]);
  } catch (err) {
    handleErrors(err, res);
  }
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const { name, surname, phone, email, password } = await req.body;
  if (!name || !surname || !phone || !email || !password) {
    return res.status(400).json({
      error: "Required fields are missing.",
    });
  }
  try {
    const uuid = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    await postgres.query(
      "INSERT INTO users (id, name, surname, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6)",
      [uuid, name, surname, phone, email, hashedPassword]
    );
    return res.status(201).json({
      message: "User created successfully.",
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUser(id);
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
    const hashedPassword = await bcrypt.hash(password, 10);
    await postgres.query("UPDATE users SET name=$1, surname=$2, phone=$3, email=$4, password=$5 WHERE id=$6", [
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
  } catch (err) {
    handleErrors(err, res);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "An ID is required for this method.",
    });
  }
  const user = await getUser(id);
  if (!user) {
    return res.status(404).json({
      error: "User not found with this ID.",
    });
  }
  try {
    const resp = await postgres.query("DELETE FROM users WHERE id=$1", [id]);
    return res.json({
      message: "User deleted successfully.",
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

export default usersRouter;
