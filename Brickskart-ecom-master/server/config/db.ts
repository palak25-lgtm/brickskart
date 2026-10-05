import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "brickskartdb",
  password: "root",
  port: 5432,
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
  } else {
    console.log("✅ PostgreSQL connected!");
    console.log("Database time:", result.rows[0].now);
  }
});

export default pool;