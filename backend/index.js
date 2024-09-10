// backend/index.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

const userRoutes = require('./api/RegisterAPI');
const getIDRoutes = require('./api/GetuserIDAPI');
const editProfileRoutes = require('./api/EditProfileAPI');
const getProfileRoutes = require('./api/GetUserProfileAPI');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3001' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Use route files
app.use('/api/users', userRoutes);
app.use('/api/profile', getIDRoutes);
app.use('/api/editProfile', editProfileRoutes);
app.use('/api/getProfile', getProfileRoutes);
// The "catchall" handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Server and database setup
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    // Establish MySQL connection
    const db = mysql.createConnection({
      host: "secret", // Replace with your MySQL host
      user: "secret", // MySQL username
      password: "!secret!", // MySQL password
      database: "secret" // MySQL database name
    });

    db.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
      }
    });

    // Make the database connection available globally
    global.db = db;
  }
});
