const { addNote, deleteNote, validateNote } = require("../../lib/notes");
const { notes } = require("../../db/db");
const router = require("express").Router();

router.get("/notes", (req, res) => {
	res.json(notes);
});

router.post("/notes", (req, res) => {
	if (!validateNote(req.body)) {
	  res.status(400).send("The note is missing information.");
	} else {
	  const note = addNote(req.body, notes);
	  res.json(note);
	}
});

router.delete("/notes/:id", (req, res) => {
	const responseCode = deleteNote(req.params.id, notes) ? 200 : 404;

	res.status(responseCode).send(req.params.id);
});

module.exports  = router;