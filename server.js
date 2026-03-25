require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword]);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Email already exists" });
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, users[0].password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ message: "Welcome, " + users[0].full_name });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(process.env.PORT, () => console.log(`Server at http://localhost:${process.env.PORT}`));