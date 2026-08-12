import { Router } from "express";
import pool from "../config/db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database Error" });
  }
});

export default router;