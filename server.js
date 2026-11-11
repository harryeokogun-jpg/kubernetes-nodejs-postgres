const express = require("express");
const { Client } = require("pg");

const app = express();

const port = process.env.PORT || 3000;

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

async function start() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    app.get("/", async (req, res) => {
      const result = await client.query("SELECT NOW()");

      res.json({
        message: "Hello from Kubernetes!",
        databaseTime: result.rows[0].now
      });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

start();
