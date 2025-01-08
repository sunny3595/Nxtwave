const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

app.use('/api', authRoutes); // Use routes defined in auth.js for /api endpoints

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
