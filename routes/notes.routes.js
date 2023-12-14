const express = require("express");
const NotesModal = require("../models/Notes.modal");
const notesController = express.Router();

notesController.post("/create", async (req, res) => {
  const { title, note, label, userID } = req.body;
  try {
    if (!title || !note || !userID) {
      res.status(401).send("all parameters reqired");
    }
    const new_note = new NotesModal({
      title,
      note,
      label,
      userID,
    });

    await new_note.save();
    res.status(201).send({"messege":"Note Saved Successfully",new_note});
  } catch (error) {
    res.send("Something Went Wrong, Please try again");
  }
});

notesController.get("/", async (req, res) => {
  const { userID } = req.body;
  try {
    const notes = await NotesModal.find({ userID });
    res.status(201).send({ messege: "Notes fetch Successfully", notes });
  } catch (error) {
    res.send("Something Went Wrong, Please try again");
  }
});

notesController.patch("/:noteId/edit", async (req, res) => {
  const {userID } = req.body;
  const { noteId } = req.params;
  try {
    const note = await NotesModal.findOne({ _id: noteId });
    console.log(note)
    if (note.userID == userID) {
      console.log("inside");
      const updated_note = await NotesModal.findOneAndUpdate(
        {_id: noteId },
        { ...req.body, updatedAt: Date.now() },
        { returnDocument:'after' }
      );
      console.log(updated_note)
      res
        .status(201)
        .send({ messege: "Notes updated Successfully", updated_note });
    }
    res.send("You are not authorize to update");
  } catch (error) {
    res.send("Something Went Wrong, Please try again");
  }
});


notesController.delete("/:noteId/delete", async (req, res) => {
    const {userID } = req.body;
    const { noteId } = req.params;
    try {
      const note = await NotesModal.findOne({ _id: noteId });
      console.log(note)
      if (note.userID == userID) {
        console.log("inside");
        const deleted_note = await NotesModal.findOneAndDelete(
          {_id: noteId }
        );
        console.log(deleted_note)
        res
          .status(201)
          .send({ messege: "Notes Deleted Successfully", deleted_note });
      }
      res.send("You are not authorize to delete");
    } catch (error) {
      res.send("Something Went Wrong, Please try again");
    }
  });


module.exports = notesController;
