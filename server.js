//Global Constants

const express = require("express");
const path = require("path")
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

//Empty array for storing note data.
let note = []

//Express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/api/notes", function(err, res) {
    try {
      note = fs.readFileSync("db/db.json", "utf8");
      note = JSON.parse(note);
  
    } catch (err) {
      console.log(err);
    }

    res.json(note);
  });
  

  app.post("/api/notes", function(req, res) {
    try {
      note = fs.readFileSync("./db/db.json", "utf8");
      note = JSON.parse(note);
      req.body.id = note.length;
  
      note.push(req.body); 
      note = JSON.stringify(note);

      fs.writeFile("./db/db.json", note, "utf8", function(err) {
   
        if (err) throw err;
      });
     
      res.json(JSON.parse(note));
  
    } catch (err) {
      throw err;
    }
  });
  

  
  app.delete("/api/notes/:id", function(req, res) {
    try {
      note = fs.readFileSync("./db/db.json", "utf8");
      note = JSON.parse(note);
      note = note.filter(function(note) {
        return note.id != req.params.id;
      });

      note = JSON.stringify(note);
      
      fs.writeFile("./db/db.json", note, "utf8", function(err) {
     
        if (err) throw err;
      });
  
     
      res.send(JSON.parse(note));
  

    } catch (err) {
      throw err;
    }
  });
  
 

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "db/db.json"));
  });
  

  app.listen(PORT, function() {
    console.log("Now listening on: " + PORT);
  });