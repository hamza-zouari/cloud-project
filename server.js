const express = require("express");
const mysql = require("mysql2");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

// Get the RDS connection details from environment variables
const host = "database-projet.cmt3qy0umg0c.us-east-1.rds.amazonaws.com";
const user = "hamza";
const password = "hamzacloud";
const database = "VOITURE";

// Create a connection to the RDS database
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

// Connect to the database
connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to the database");
});

// Set up a route to get voiture data
app.get("/", (req, res) => {
  connection.query("SELECT * FROM voiture", (error, results) => {
    if (error) throw error;

    // Render the voiture data in a template
    res.render("voiture", { cars: results });
  });
});

app.post("/", (req, res) => {
  const name = req.body.name;
  const type = req.body.department;

  connection.query(
    "INSERT INTO voiture (name, type) VALUES (?, ?)",
    [name, type],
    (error, results) => {
      if (error) throw error;

      res.redirect("/");
    }
  );
});

// Start the server
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});