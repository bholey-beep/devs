const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

// GET TASKS (USER ONLY)
router.get("/", auth, async (req, res) => {
  const result = await db.query(
    "SELECT * FROM tasks WHERE user_id=$1 ORDER BY id DESC",
    [req.user.id]
  );

  res.json(result.rows);
});

// CREATE TASK
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  await db.query(
    `INSERT INTO tasks (title, description, user_id)
     VALUES ($1,$2,$3)`,
    [title, description || "", req.user.id]
  );

  res.json({ message: "Task created" });
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const { title, description, status } = req.body;

  await db.query(
    `UPDATE tasks 
     SET title=$1, description=$2, status=$3, updated_at=CURRENT_TIMESTAMP
     WHERE id=$4 AND user_id=$5`,
    [title, description, status, req.params.id, req.user.id]
  );

  res.json({ message: "Task updated" });
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  await db.query(
    "DELETE FROM tasks WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.id]
  );

  res.json({ message: "Task deleted" });
});

module.exports = router;