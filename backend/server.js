const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'sql7.freesqldatabase.com',  // Your database host
  user: 'sql7750626',                // Your database username
  password: 'F5h6kxYcSn',            // Your database password
  database: 'sql7750626'             // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the database.');
  }
});

// Route to fetch all academic years
app.get('/academic-years', (req, res) => {
  const query = 'SELECT * FROM academic_years';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching academic years', error: err });
    }
    res.json(results);
  });
});

// Route to add a new academic year
app.post('/academic-years', (req, res) => {
  const { yearName, semesters } = req.body;
  const query = 'INSERT INTO academic_years (yearName, semesters) VALUES (?, ?)';
  db.query(query, [yearName, JSON.stringify(semesters)], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding academic year', error: err });
    }
    res.status(201).json({ message: 'Academic year added successfully', id: result.insertId });
  });
});

// Route to edit an academic year
app.put('/academic-years/:id', (req, res) => {
  const { id } = req.params;
  const { yearName, semesters } = req.body;
  const query = 'UPDATE academic_years SET yearName = ?, semesters = ? WHERE id = ?';
  db.query(query, [yearName, JSON.stringify(semesters), id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating academic year', error: err });
    }
    res.json({ message: 'Academic year updated successfully' });
  });
});

// Route to delete an academic year
app.delete('/academic-years/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM academic_years WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting academic year', error: err });
    }
    res.json({ message: 'Academic year deleted successfully' });
  });
});

// Route to edit a semester
app.put('/academic-years/:yearId/semesters/:semesterIndex', (req, res) => {
  const { yearId, semesterIndex } = req.params;
  const { semesterName } = req.body;
  const query = 'SELECT semesters FROM academic_years WHERE id = ?';
  db.query(query, [yearId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching semesters', error: err });
    }

    let semesters = JSON.parse(results[0].semesters);
    if (semesters[semesterIndex]) {
      semesters[semesterIndex] = semesterName;
      const updateQuery = 'UPDATE academic_years SET semesters = ? WHERE id = ?';
      db.query(updateQuery, [JSON.stringify(semesters), yearId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating semester', error: err });
        }
        res.json({ message: 'Semester updated successfully' });
      });
    } else {
      res.status(404).json({ message: 'Semester not found' });
    }
  });
});

// Route to delete a semester
app.delete('/academic-years/:yearId/semesters/:semesterIndex', (req, res) => {
  const { yearId, semesterIndex } = req.params;
  const query = 'SELECT semesters FROM academic_years WHERE id = ?';
  db.query(query, [yearId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching semesters', error: err });
    }

    let semesters = JSON.parse(results[0].semesters);
    if (semesters[semesterIndex]) {
      semesters.splice(semesterIndex, 1); // Remove semester
      const updateQuery = 'UPDATE academic_years SET semesters = ? WHERE id = ?';
      db.query(updateQuery, [JSON.stringify(semesters), yearId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error deleting semester', error: err });
        }
        res.json({ message: 'Semester deleted successfully' });
      });
    } else {
      res.status(404).json({ message: 'Semester not found' });
    }
  });
});

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
