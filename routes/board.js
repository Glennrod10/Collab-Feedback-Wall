const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const protect = require("../middleware/authMiddleware");


router.post('/', protect, async (req ,res) => {
  const {title , description} = req.body;
  try {
    const board = new Board({
      title,
      description,
      owner: req.user._id,
    })

    await board.save();
    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
    
  }
})

router.get('/' , protect ,async (req , res) => {
  try {
    const boards = await Board.find({owner: req.user._id})
    res.json(boards)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
})

module.exports = router;