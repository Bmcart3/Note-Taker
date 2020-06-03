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

//This should be returning the notes from the db.json
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});


//To create new notes and also needs to save them to db.json.
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    //Need to find a way to give each note an id equal to 0 then 1 then 2 etc so it will work with my index in the delete functionality i think.
    newNote.id = Math.floor(Math.random() * 10000);
    notes.push(newNote);
    res.json(newNote);
    
    //This writes the notes array to the db.json file.
    fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
        if (err) {
            throw err;
        }
    });
});

app.delete("/api/notes/:id", function (req, res) {
    const index = notes.indexOf(notes.id);
    const removed = notes.splice(index, 1);
    res.json(removed[0]);

    fs.writeFile("./db/db.json", JSON.stringify(removed), err => {
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

//Leaving this here for when i return to fix the delete functionality. I may go back to trying filter.
//===================================================================
// app.delete("/api/notes/:id", function(req, res) {
//     const index = parseInt(req.params.index);
//     const removed = data.splice(index, 1);
//     res.json(removed[0]);
// })


// app.delete("/api/notes/:id", function(req, res) {
//     //console.log(req.params.id); //req.params.id is equal to the unique id given in line 42.
//     const id = parseInt(req.params.id);
//     let filtered = notes.filter(function(note) {
//         console.log(note.id); 
//         return note.id !== id;
//     });
    
//     fs.writeFile("./db/db.json", JSON.stringify(filtered), err => {
//         if (err) {
//             throw err;
//         }
//     });
// });
