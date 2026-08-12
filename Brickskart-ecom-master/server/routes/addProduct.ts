import { Router } from "express";
import pool from "../config/db";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { product_name, category, price, stock, image, description } = req.body;

    const result = await pool.query(
      `INSERT INTO products
      (product_name, category, price, stock, image, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [product_name, category, price, stock, image, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

export default router;