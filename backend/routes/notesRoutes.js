const express = require("express");
const router = express.Router();

const {
  getNotes,
  createNote,
  editNote,
  deleteNote,
  pinNote,
  searchNote,
} = require("../controllers/notesControllers.js");
const authenticationToken = require("../middlewares/utilities.js");

router
  .get("/", authenticationToken, getNotes)
  .post("/add-note", authenticationToken, createNote)
  .post("/edit-note/:id", authenticationToken, editNote)
  .delete("/delete-note/:id", authenticationToken, deleteNote)
  .post("/update-note-pinned/:id", authenticationToken, pinNote)
  .get("/search-notes", authenticationToken, searchNote);
module.exports = router;
