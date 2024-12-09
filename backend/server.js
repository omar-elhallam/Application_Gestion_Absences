// server.js

const express = require('express');
const mysql = require('mysql2');

// Initialize Express app
const app = express();
const port = 3001;

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'sql7.freesqldatabase.com',    // Change this if your database is hosted elsewhere
  user: 'sql7750626',         // Change to your database username
  password: 'F5h6kxYcSn',         // Change to your database password
  database: 'sql7750626'  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the database.');
  }
});

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});