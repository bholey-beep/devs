require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

async function connectWithRetry() {
  let retries = 10;

  while (retries) {
    try {
      const client = await pool.connect();
      console.log("✅ PostgreSQL Connected Successfully");
      client.release();
      return;
    } catch (err) {
      console.log(`⏳ PostgreSQL not ready. Retries left: ${retries}`);
      retries--;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.error("❌ Could not connect to PostgreSQL");
}

connectWithRetry();

module.exports = {
  query: (text, params) => pool.query(text, params),
};