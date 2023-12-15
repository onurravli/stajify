import express, { Router, Request, Response } from "express";
import services from "../services";
import { handleErrors } from "../services/postgres.service";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const companiesRouter: Router = express.Router();
const postgres = services.postgres;

const getCompany = async (id: string) => {
  try {
    const company = await postgres.query("SELECT * FROM companies WHERE id=$1", [id]);
    return company.rows[0];
  } catch (err) {
    return null;
  }
};

companiesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const resp = await postgres.query("SELECT * FROM companies");
    return resp.rows.length != 0
      ? res.json(resp.rows)
      : res.json({
          message: "No companies found.",
        });
  } catch (err) {
    handleErrors(err, res);
  }
});

companiesRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await getCompany(id);
  if (!company) {
    return res.status(404).json({
      error: "Company not found with this ID.",
    });
  }
  try {
    const resp = await postgres.query("SELECT * FROM companies WHERE id=$1", [id]);
    return res.json(resp.rows[0]);
  } catch (err) {
    handleErrors(err, res);
  }
});

companiesRouter.post("/", async (req: Request, res: Response) => {
  const { name, phone, email, password, city, province } = await req.body;
  if (!name || !phone || !email || !password || !city || !province) {
    return res.status(400).json({
      error: "Required fields are missing.",
    });
  }
  try {
    const uuid = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    await postgres.query(
      "INSERT INTO companies (id, name, phone, email, password, city, province) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [uuid, name, phone, email, hashedPassword, city, province]
    );
    return res.status(201).json({
      message: "Company created successfully.",
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

companiesRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await getCompany(id);
  if (!company) {
    return res.status(404).json({
      error: "Company not found with this ID.",
    });
  }
  const { name, phone, email, password, city, province } = await req.body;
  if (!name || !phone || !email || !password || !city || !province) {
    return res.status(400).json({
      error: "Required fields are missing.",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await postgres.query(
      "UPDATE companies SET name=$1, phone=$2, email=$3, password=$4, city=$5, province=$6 WHERE id=$7",
      [name, phone, email, hashedPassword, city, province, id]
    );
    return res.json({
      message: "Company updated successfully.",
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

companiesRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "An ID is required for this method.",
    });
  }
  const company = await getCompany(id);
  if (!company) {
    return res.status(404).json({
      error: "Company not found with this ID.",
    });
  }
  try {
    const resp = await postgres.query("DELETE FROM companies WHERE id=$1", [id]);
    return res.json({
      message: "Company deleted successfully.",
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

export default companiesRouter;
