const express = require("express");
const path = require("path");
const noteUid = require("short-unique-iduid");
const noteData = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) =>
  //__dirname -current directory
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  //__dirname -current directory
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//get api route
app.get("/api/notes", (req, res) => res.json(noteData));

//post api route
app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: noteUid(),
    };

    const response = {
      status: "success",
      body: newNote,
    };
  }
});

//delete api route

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
