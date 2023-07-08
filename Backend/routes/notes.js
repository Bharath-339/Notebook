const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

const fecthuser = require("../middleware/fetchUser");

router.get("/fetchallnotes", fecthuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.user.id });
  // console.log(notes);
  res.json(notes);
});

router.post(
  "/addNotes",
  [
    body("title", "title must be atleast characters long").isLength(),
    body("description", "description must be atleast characters long").isLength(),
  ],
  fecthuser,  
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("validation error")
        return res.status(400).json({ error: errors.array() });
      }
      console.log("Mongo error")
      const { title, description, tag } = req.body;
      const note = await new Notes({
        title,
        description,
        tag,
        user: req.user.user.id,
      });
      note.save();
      res.json(note);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }
);

router.delete("/deleteNote/:id", fecthuser, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findByIdAndDelete(id);

    return res.json({ msg: "Notes deleted" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});



router.put("/updatenote/:id", fecthuser, async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const { id } = req.params;
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note and update it

    let note = await Notes.findById(id);

    if (!note) {
      return res.status(400).json({ msg: "Notes Not found" });
    }
    // console.log(note.user)
    // console.log(req.user.user.id)
    if (note.user.toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "Not allowed" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    return res.json({ msg: "Notes create", note });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
