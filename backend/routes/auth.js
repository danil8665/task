const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_KEY } = require("../middlewares/middleware");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered", token, userId: newUser.id });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, userId: user.id });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
