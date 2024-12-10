const express = require('express');
const server = express();
const port = 7777; // Port number
server.use(express.json());
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

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
        res.send('User registered successfully!');
    });
});

server.post('/questions', (req, res) => {
    const { question, category } = req.body;
    const query = `INSERT INTO questions (question, category) VALUES (?, ?)`;
    db.run(query, [question, category], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.send('Question added successfully!');
    });
});

server.post('/answers', (req, res) => {
    const { question_id, answer, preferred_scents } = req.body;
    const query = `INSERT INTO answers (question_id, answer, preferred_scents) VALUES (?, ?, ?)`;
    db.run(query, [question_id, answer, preferred_scents], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.send('Answer added successfully!');
    });
});

server.post('/choosescents', (req, res) => {
    const { name, description, type, brand, image } = req.body;
    const query = `INSERT INTO perfumes (name, description, type, brand, image) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [name, description, type, brand, image], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.send('Perfume added successfully!');
    });
});

server.post('/recommendations', (req, res) => {
    const { user_id, perfumes_id } = req.body;
    const query = `INSERT INTO recommendations (user_id, perfumes_id) VALUES (?, ?)`;
    db.run(query, [user_id, perfumes_id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.send('Recommendation added successfully!');
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

// Fetch all data
server.get('/register', (req, res) => {
    const query = `SELECT * FROM user`;
    db.all(query, (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

server.get('/questions', (req, res) => {
    const query = `SELECT * FROM questions`;
    db.all(query, (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

server.get('/answers', (req, res) => {
    const query = `SELECT * FROM answers`;
    db.all(query, (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

server.get('/choosescents', (req, res) => {
    const query = `SELECT * FROM perfumes`;
    db.all(query, (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

server.get('/recommendations', (req, res) => {
    const query = `SELECT * FROM recommendations`;
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



