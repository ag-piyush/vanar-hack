const express = require("express");
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

// express app setup
const app = express();
app.use(cors());
app.use(express.json());

// db setup & check
const pool = require("./api/db"); // Import the pool
async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT version()");
    console.log("Database connected: ", result.rows[0]);
  } finally {
    client.release();
  }
}
getPgVersion();

// Routes
const routes = require("./api/routes")(pool);
app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
