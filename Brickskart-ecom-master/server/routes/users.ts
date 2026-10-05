import { Router } from "express";
import pool from "../config/db";

const router = Router();

// TEST
router.get("/test", (req, res) => {
  res.json({
    message: "Users backend is working!",
  });
});

// REGISTER USER
router.post("/", async (req, res) => {
  try {
    const {
      name,
      mail,
      phone,
      passsword,
      role,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO users
      (full_name, email, password, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id, full_name, email, phone, role`,
      [
        name,
        mail,
        passsword,
        phone,
        role || "user",
      ]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("USER DATABASE ERROR:", error);

    res.status(500).json({
      message: "Failed to register user",
    });
  }
});

export default router;