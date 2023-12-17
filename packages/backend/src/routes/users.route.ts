import express, { Router, Request, Response } from "express";
import services from "../services";
import { error_codes, handleErrors } from "../services/postgres.service";
import { v4 as uuidv4 } from "uuid";
import bcrypt, { hash } from "bcrypt";

const usersRouter: Router = express.Router();
const postgres = services.postgres;

const getUserById = async (id: string) => {
  try {
    const user = await postgres.query("SELECT * FROM users WHERE id=$1", [id]);
    return user.rows[0];
  } catch (err) {
    return null;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await postgres.query("SELECT * FROM users WHERE email=$1", [email]);
    return user.rows[0];
  } catch (err) {
    return null;
  }
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
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
  const user = await getUserById(id);
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
      errorPrintable: "Gerekli alanlar eksik.",
    });
  }
  try {
    const uuid = uuidv4();
    const hashedPassword = await hashPassword(password);
    const is_verified = false;
    await postgres.query(
      "INSERT INTO users (id, name, surname, phone, email, password, is_verified) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [uuid, name, surname, phone, email, hashedPassword, is_verified]
    );
    return res.status(201).json({
      message: "User created successfully.",
      messagePrintable: "Kullanıcı başarıyla oluşturuldu.",
    });
  } catch (err) {
    return res.status(409).json({
      error: "User with this email already exists.",
      errorPrintable: "Bu e-posta ile kayıtlı kullanıcı zaten var.",
    });
  }
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(id);
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
    const hashedPassword = await hashPassword(password);
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

usersRouter.put("/verify/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "An ID is required for this action.",
    });
  }
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json({
      error: "User not found with this ID.",
    });
  }
  try {
    await postgres.query("UPDATE users SET is_verified=$1 WHERE id=$2", [true, id]);
    return res.json({
      message: "User verified successfully.",
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "An ID is required for this action.",
    });
  }
  const user = await getUserById(id);
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

usersRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = await req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Required fields are missing.",
      errorPrintable: "Gerekli alanlar eksik.",
    });
  }
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(404).json({
      error: "User not found with this email.",
      errorPrintable: "Bu e-posta ile kayıtlı kullanıcı bulunamadı.",
    });
  }
  const passwordInDb = user.password;
  const isPasswordCorrect = await bcrypt.compare(password, passwordInDb);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      error: "Incorrect password.",
      errorPrintable: "Hatalı şifre.",
    });
  }
  return res.json({}); // TODO - Implement login
});

export default usersRouter;
