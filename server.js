// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Notes array
//==============================================================
const notes = [];

//Routes
//==============================================================

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public", "/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public", "/notes.html"));
});

//This should be returning the notes from the db.json I believe. Ask about this.
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});


//To create new notes and also needs to save them to db.json.
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote.id = Math.floor(Math.random() * 1000000);
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
    
    //This writes the notes array to the db.json file.
    fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
        if (err) {
            throw err;
        }
    });
});

app.delete("/api/notes/:id", function(req, res) {
    console.log(req.params.id);
    let filtered = notes.filter(function(note) {
        console.log(note);
        return note.id === req.params.id;
        
    });
    console.log(filtered);
    fs.writeFile("./db/db.json", JSON.stringify(filtered), err => {
        if (err) {
            throw err;
        }
    });
});


//Starts the server to begin listening
//===============================================================
app.listen(PORT, function () {
    console.log("App listening on Port " + PORT);
});