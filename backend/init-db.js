// backend/init-db.js
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_FILE = process.env.DATABASE_FILE || './data/funshiksha.db';
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
  // Teachers table (login_id is PRIMARY KEY)
  db.run(`
    CREATE TABLE IF NOT EXISTS teachers (
      login_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      subject TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Students table with composite primary key (roll_number + class_name)
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      roll_number TEXT NOT NULL,
      class_name TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (roll_number, class_name)
    );
  `);

  // Optional quiz results
  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_roll TEXT,
      student_class TEXT,
      subject TEXT,
      score INTEGER,
      total INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed a teacher for testing (only if not exists)
  const seedLogin = 'teacher1';
  const seedPassword = 'secret123';
  db.get('SELECT login_id FROM teachers WHERE login_id = ?', [seedLogin], (err, row) => {
    if (err) {
      console.error(err);
      db.close();
      return;
    }
    if (row) {
      console.log('Seed teacher exists:', seedLogin);
      db.close();
    } else {
      const hash = bcrypt.hashSync(seedPassword, 10);
      db.run('INSERT INTO teachers (login_id, name, password, subject) VALUES (?, ?, ?, ?)',
        [seedLogin, 'Seed Teacher', hash, 'Mathematics'],
        function (err) {
          if (err) console.error(err);
          else console.log('Seed teacher created -> login_id:', seedLogin, 'password:', seedPassword);
          db.close();
        });
    }
  });
});
