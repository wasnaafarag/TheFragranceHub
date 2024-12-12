const express = require('express');
const cors = require('cors');  // Make sure CORS is properly imported
const sqlite3 = require('sqlite3').verbose();

const server = express();
const port = 7777; // Port number

// Middleware
server.use(cors());  // Apply CORS middleware
server.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Basic route
server.get("/", (req, res) => {
    res.send("Welcome to The Fragrance Hub Backend!");
});

// Create Tables
const createusertable = `CREATE TABLE IF NOT EXISTS user(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT NOT NULL, 
    age INTEGER,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    gender TEXT NOT NULL
)`;

const creatquestionstable = `CREATE TABLE IF NOT EXISTS questions(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    question TEXT NOT NULL,
    category TEXT
)`;

const createanswerstable = `CREATE TABLE IF NOT EXISTS answers(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    question_id INTEGER NOT NULL, 
    answer TEXT NOT NULL, 
    preferred_scents TEXT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(ID)
)`;

const createperfumestable = `CREATE TABLE IF NOT EXISTS perfumes(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL,
    description TEXT,
    type TEXT,
    brand TEXT,
    image TEXT
)`;

const createrecommendationstable = `CREATE TABLE IF NOT EXISTS recommendations(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_id INTEGER NOT NULL,
    perfumes_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(ID),
    FOREIGN KEY (perfumes_id) REFERENCES perfumes(ID)
)`;

// Routes for inserting data
server.post('/register', (req, res) => {
    const { username, age, email, password, gender } = req.body;
    const query = `INSERT INTO user (username, age, email, password, gender) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [username, age, email, password, gender], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.status(200).json({ message: 'User registered successfully!' });
    });
});

// Login route
server.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
    db.get(query, [email, password], (err, row) => {
      if (err) return res.status(400).json({ error: err.message });
      if (!row) return res.status(401).json({ error: 'Invalid email or password' });
  
      res.status(200).json({ user: row });
    });
});

// Update user password
server.put('/register/:ID', (req, res) => {
    const { password } = req.body;
    const query = `UPDATE user SET password = ? WHERE ID = ?`;
    db.run(query, [password, req.params.ID], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.send('Password updated successfully!');
    });
});

// Fetch data
server.get('/register', (req, res) => {
    const query = `SELECT * FROM user`;
    db.all(query, (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// Delete user
server.delete('/register/:ID', (req, res) => {
    const query = `DELETE FROM user WHERE ID = ?`;
    db.run(query, [req.params.ID], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.send('User deleted successfully!');
    });
});

// Initialize server and database
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    db.serialize(() => {
        db.exec(createusertable);
        db.exec(creatquestionstable);
        db.exec(createanswerstable);
        db.exec(createperfumestable);
        db.exec(createrecommendationstable);
        console.log('All tables created successfully!');
    });
});
