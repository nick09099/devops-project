const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// DB connection
const pool = new Pool({
  host: "postgres",
  user: "postgres",
  password: "postgres",
  database: "appdb",
  port: 5432,
});

// Initialize DB (create table)
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT
      )
    `);
    console.log("Database initialized");
  } catch (err) {
    console.error("DB init error:", err);
  }
}
initDB();

// Routes (NO /api prefix here)

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// Add user
app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    await pool.query("INSERT INTO users(name) VALUES($1)", [name]);
    res.json({ message: "User added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

// Health check (very useful in DevOps)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});