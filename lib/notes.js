const fs = require("fs");
const path = require("path");

function validateNote(note) {
	return ((note.title) && (note.text));
}

function addNote(myNote, notesDB) {
	myNote.id = Date.now().toString();
	notesDB.push(myNote);
	
	fs.writeFileSync(
	  path.join(__dirname, "../db/db.json"),
	  JSON.stringify({ notes: notesDB }, null, 2)
	);

	return myNote;
}

function deleteNote(noteId, notesDB) {
	const noteIndex = notesDB.findIndex(note => note.id === noteId);

	if (noteIndex > -1) {
		notesDB.splice(noteIndex, 1)
	
		fs.writeFileSync(
			path.join(__dirname, "../db/db.json"),
			JSON.stringify({ notes: notesDB }, null, 2)
		);

		return true;
	} else {
		return false;
	}
}

module.exports = {
	addNote,
	deleteNote,
	validateNote
};