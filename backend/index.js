const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/toDos");
const sequelize = require("./db/db");
const dotenv = require('dotenv');
dotenv.config();


sequelize.sync({ alter: true }) 
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("DB sync error:", err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
