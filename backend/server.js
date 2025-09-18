require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 5000;
const DB_FILE = process.env.DATABASE_FILE || './data/funshiksha.db';
const FRONTEND = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const app = express();
app.use(express.json());
app.use(cors({ origin: FRONTEND }));

// open DB connection (only once)
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Failed to open DB', err);
    process.exit(1);
  }
  console.log('Connected to DB:', DB_FILE);
});

/* ------------------- TEACHER ROUTES ------------------- */

// Teacher registration (no password/auth anymore)
app.post('/api/teacher/register', (req, res) => {
  const { name, login_id, subject } = req.body;
  if (!name || !login_id) return res.status(400).json({ message: 'Missing fields' });

  db.get('SELECT login_id FROM teachers WHERE login_id = ?', [login_id], (err, row) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (row) return res.status(400).json({ message: 'Login ID already exists' });

    db.run('INSERT INTO teachers (login_id, name, subject) VALUES (?, ?, ?)',
      [login_id, name, subject || null],
      function (err) {
        if (err) return res.status(500).json({ message: 'Insert error' });
        return res.json({ message: 'Teacher registered successfully' });
      });
  });
});

// Removed teacher login route since no authentication needed


/* ------------------- STUDENT ROUTES ------------------- */

// Student registration
app.post('/api/student/register', (req, res) => {
  const { name, roll_number, class_name } = req.body;
  if (!name || !roll_number || !class_name) return res.status(400).json({ message: 'Missing fields' });

  db.get('SELECT roll_number FROM students WHERE roll_number = ? AND class_name = ?', [roll_number, class_name], (err, row) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (row) return res.status(400).json({ message: 'Roll number already exists in this class' });

    db.run('INSERT INTO students (roll_number, class_name, name) VALUES (?, ?, ?)', [roll_number, class_name, name], function (err) {
      if (err) return res.status(500).json({ message: 'Insert error' });
      return res.json({ message: 'Student registered successfully' });
    });
  });
});

// Removed student login route since no authentication needed


/* ------------------- START SERVER ------------------- */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
