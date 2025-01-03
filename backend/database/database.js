const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to a SQLite database file
const db = new sqlite3.Database('./database/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create Users table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            profileImage TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Users table created');
        }
    });
});

// Function to insert a new user into the database
const createUser = (name, email, password, profileImagePath, callback) => {
    const stmt = db.prepare(`
        INSERT INTO users (name, email, password, profileImage)
        VALUES (?, ?, ?, ?)
    `);
    stmt.run(name, email, password, profileImagePath, function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, this.lastID);  // Returns the ID of the newly inserted user
        }
    });
    stmt.finalize();
};

// Function to check if the email already exists in the database
const checkEmailExists = (email, callback) => {
    db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);  // Returns the user row if email exists, otherwise null
        }
    });
};

module.exports = { db, createUser, checkEmailExists };
