const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');  // Import multer
const path = require('path');
const db = require('../database/database');  // Import SQLite database connection

// Setup for file uploads with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  // Store uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);  // Add timestamp to filename
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });  // Initialize multer with storage settings

// Register Route
router.post('/register', (req, res) => {
    const { name,email, password, profileImage } = req.body;
    // Check if the user already exists in the database
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (users.find(user => user.email === email)) {
            return res.status(400).send('User already exists');
        }
	users.push({ name, email, password, profileImage });
        // Insert new user into the database
        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
            if (err) {
                return res.status(500).send('Error registering user');
            }
            res.status(201).send('User registered successfully');
        });
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists and password matches
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (!row) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate OTP and send it via email
        const otp = Math.floor(100000 + Math.random() * 900000);
        sendOtpEmail(email, otp);

        // Store OTP temporarily (In a real scenario, you'd store it in a session or database)
        res.status(200).send({ otp, message: 'OTP sent to your email' });
    });
});

// OTP Verification Route
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    // Logic to verify OTP (you would typically store it in a session or database)
    if (otp === '123456') {  // In real applications, this should come from a secure source
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

// Account Deletion Route
router.delete('/delete-account', (req, res) => {
    const { email } = req.body;
    // Delete user from the database
    db.run('DELETE FROM users WHERE email = ?', [email], function (err) {
        if (err) {
            return res.status(500).send('Error deleting account');
        }
        if (this.changes === 0) {
            return res.status(400).send('Account not found');
        }
        res.status(200).send('Account deleted successfully');
    });
});

// File Upload Route (Optional)
router.post('/upload', upload.single('profilePicture'), (req, res) => {
    // Logic for handling file upload
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    // Assuming file is uploaded successfully, you can save the file info to the database if needed
    // Example: Saving file path to the database
    const filePath = req.file.path;

    res.status(200).send({
        message: 'File uploaded successfully',
        filePath: filePath
    });
});

// Function to send OTP via email
const sendOtpEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending OTP:', error);
        } else {
            console.log('OTP sent:', info.response);
        }
    });
};

module.exports = router;
