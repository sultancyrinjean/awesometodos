const express = require("express");
const app = express();
require("dotenv").config(); // Load .env variables
const { connectToDatabase } = require("./database");
const routes = require("./routes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });