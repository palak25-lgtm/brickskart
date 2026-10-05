import { Router } from "express";
import pool from "../config/db";

const router = Router();

/*
  1. GET ALL PRODUCTS
  GET /api/products
*/
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY product_id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});


/*
  2. GET ONE PRODUCT
  GET /api/products/1
*/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET ONE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
});


/*
  3. ADD PRODUCT
  POST /api/products
*/
router.post("/", async (req, res) => {
  try {
    const {
      product_name,
      category,
      price,
      stock,
      image,
      description,
      subcategory,
      material_type,
      brand,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO products
      (
        product_name,
        category,
        price,
        stock,
        image,
        description,
        subcategory,
        material_type,
        brand
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        product_name,
        category,
        price,
        stock,
        image,
        description,
        subcategory,
        material_type,
        brand,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Failed to add product",
    });
  }
});


/*
  4. UPDATE PRODUCT
  PUT /api/products/1
*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      product_name,
      category,
      price,
      stock,
      image,
      description,
      subcategory,
      material_type,
      brand,
    } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET
         product_name = $1,
         category = $2,
         price = $3,
         stock = $4,
         image = $5,
         description = $6,
         subcategory = $7,
         material_type = $8,
         brand = $9
       WHERE product_id = $10
       RETURNING *`,
      [
        product_name,
        category,
        price,
        stock,
        image,
        description,
        subcategory,
        material_type,
        brand,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
});


/*
  5. DELETE PRODUCT
  DELETE /api/products/1
*/
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
});


/*
  6. SEARCH PRODUCTS
  GET /api/products/search?q=cement
*/
router.get("/search", async (req, res) => {
  try {
    const q = String(req.query.q || "");

    const result = await pool.query(
      `SELECT * FROM products
       WHERE product_name ILIKE $1
          OR description ILIKE $1
          OR category ILIKE $1
          OR brand ILIKE $1
       ORDER BY product_id DESC`,
      [`%${q}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("SEARCH PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Failed to search products",
    });
  }
});


/*
  7. UPDATE STOCK
  PATCH /api/products/1/stock
*/
router.patch("/:id/stock", async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        message: "Valid stock value is required",
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET stock = $1
       WHERE product_id = $2
       RETURNING *`,
      [stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Stock updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE STOCK ERROR:", error);

    res.status(500).json({
      message: "Failed to update stock",
    });
  }
});


export default router;