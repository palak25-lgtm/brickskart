import { Router } from "express";
import pool from "../config/db";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      total_amount,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO orders
      (user_id, total_amount, status)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [
        user_id,
        total_amount,
        "pending",
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("ORDER DATABASE ERROR:", error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
});

export default router;