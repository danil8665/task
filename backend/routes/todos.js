const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { authenticateToken } = require("../middlewares/middleware");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { user_id: req.user.userId } });
    res.json(todos);
  } catch (error) {
    console.error("Fetch Todos error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { text, description } = req.body;

  try {
    const newTodo = await Todo.create({
      user_id: req.user.userId,
      text,
      description,
      status: "todo",
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Add Todo error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const todo = await Todo.findOne({ where: { id, user_id: req.user.userId } });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.status = status;
    await todo.save();

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("Update Todo error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ where: { id, user_id: req.user.userId } });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Delete Todo error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
