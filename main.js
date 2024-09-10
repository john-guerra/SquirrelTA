const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Specify the path to the database file
const dbPath = path.join(__dirname, "db", "squirrel.sqlite3");

// Create a new database connection
const db = new sqlite3.Database(dbPath);

// Create the "squirrel" table
db.serialize(() => {
  db.run("CREATE TABLE squirrel (name TEXT, age INTEGER, species TEXT)");
});

// Generate 10 random examples and insert them into the "squirrel" table
for (let i = 0; i < 10; i++) {
  const name = `Squirrel ${i + 1}`;
  const age = Math.floor(Math.random() * 10) + 1;
  const species = ["Red Squirrel", "Gray Squirrel", "Flying Squirrel"][
    Math.floor(Math.random() * 3)
  ];

  db.run("INSERT INTO squirrel (name, age, species) VALUES (?, ?, ?)", [
    name,
    age,
    species,
  ]);
}

// Close the database connection
db.close();
