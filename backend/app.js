const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Init DB
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title TEXT,
        content TEXT
      )
    `);

    // Insert sample data if empty
    const res = await pool.query("SELECT COUNT(*) FROM articles");
    if (parseInt(res.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO articles (title, content) VALUES
        ('Docker Basics', 'Containers, images, and volumes explained.'),
        ('CI/CD Pipeline', 'Automate build, test, deploy.'),
        ('Nginx Reverse Proxy', 'Route traffic to backend services.');
      `);
    }

    console.log("DB initialized");
  } catch (err) {
    console.error("DB error:", err);
  }
}
initDB();


// ✅ GET all articles
app.get("/articles", async (req, res) => {
  const result = await pool.query("SELECT * FROM articles ORDER BY id DESC");
  res.json(result.rows);
});

// ✅ GET single article
app.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM articles WHERE id=$1", [id]);
  res.json(result.rows[0]);
});

// ✅ POST new article
app.post("/articles", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title & content required" });
  }

  await pool.query(
    "INSERT INTO articles(title, content) VALUES($1, $2)",
    [title, content]
  );

  res.json({ message: "Article added" });
});

// health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => console.log("Backend running"));