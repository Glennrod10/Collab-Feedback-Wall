const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const protect = require("../middleware/authMiddleware");

// POST /api/notes/:boardId — Add note to a board
router.post("/:boardId", protect, async (req, res) => {
  const { content } = req.body;
  const { boardId } = req.params;

  try {
    const note = new Note({
      content,
      board: boardId,
      author: req.user._id
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error("❌ Error adding note:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:boardId" , protect , async (req , res) => {
  const { boardId } = req.params;
  try {
     const notes = await Note.find({board: boardId}).sort({createdAt : -1}).populate("author", "username email");
        res.json(notes)
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    res.status(500).json({ message: "Server error" });
    
  }
});

module.exports = router;
