const asyncHandler = require("express-async-handler");
const Note = require("../models/note.model.js");

//get all notes

const getNotes = asyncHandler(async (req, res) => {
  const { user } = req.user;
  if (!user || !user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
  //console.log(notes);
  res
    .status(200)
    .json({ error: false, message: "All notes retreved successfully", notes });
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  //console.log(user);
  if (!title) {
    res.status(400);
    throw new Error("Title is mandatory");
  }
  if (!content) {
    res.status(400);
    throw new Error("Content is mandatory");
  }
  const note = await Note.create({
    userId: user._id,
    title,
    content,
    tags: tags || [],
  });
  res.status(201).json(note);
});

const editNote = asyncHandler(async (req, res) => {
  //console.log("Helooooooo");

  const noteId = req.params.id;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;
  if (!title && !content && !tags) {
    return res.status(400).json({ message: "No changes provided" });
  }

  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  if (title) note.title = title;
  if (content) note.content = content;
  if (tags) note.tags = tags;
  if (isPinned) note.isPinned = isPinned;

  await note.save();
  res.status(200).json({ message: "Updated", note });
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const { user } = req.user;
  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) {
    return res.status(404).json({ error: true, message: "Note not found" });
  }

  await Note.deleteOne({ _id: noteId, userId: user._id });
  res.status(200).json({ error: false, message: "Note deleted succesfully" });
});

const pinNote = asyncHandler(async (req, res) => {
  //console.log("Helooooooo");

  const noteId = req.params.id;
  const { user } = req.user;

  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.isPinned = !note.isPinned;

  await note.save();
  res.status(200).json({ message: "Note Pinned", note });
});

const searchNote = asyncHandler(async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Seach query is required!" });
  }

  const matchingNote = await Note.find({
    userId: user._id,
    $or: [
      { title: { $regex: new RegExp(query, "i") } },
      { content: { $regex: new RegExp(query, "i") } },
    ],
  });

  res.status(200).json({
    error: false,
    notes: matchingNote,
    message: "Notes matching the search query retrieved successfully!",
  });
});

module.exports = {
  getNotes,
  createNote,
  editNote,
  deleteNote,
  pinNote,
  searchNote,
};
