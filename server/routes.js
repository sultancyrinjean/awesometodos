const express = require("express");
const router = express.Router();
const { getCollection } = require("./models/index");
const { ObjectId } = require("mongodb");

// GET /todos – Get all todos
router.get("/todos", async (req, res) => {
  try {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /todos – Add a new todo
router.post("/todos", async (req, res) => {
  try {
    const collection = getCollection();
    const { todo } = req.body;
    const newTodo = await collection.insertOne({ todo, status: false });
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /todos/:id – Toggle todo status
router.put("/todos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    const updatedTodo = await collection.updateOne(
      { _id },
      { $set: { status: !status } }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id – Delete a todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deletedTodo = await collection.deleteOne({ _id });
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;