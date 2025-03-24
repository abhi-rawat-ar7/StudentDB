const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database/db'); // Import MongoDB connection
const studentsRoutes = require('./routes/students'); // Import student routes

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the students routes
app.use('/students', studentsRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Student DBMS!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
