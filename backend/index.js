// backend/index.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./api/userRoutes');
const profileRoutes = require('./api/profileRoutes');
const dataRoutes = require('./api/dataRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Use route files
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/data', dataRoutes);

// The "catchall" handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Server and database setup
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server running at http://localhost:${port}/LandingPage`);

    // Establish MySQL connection
    const db = mysql.createConnection({
      host: "mysocialgrdn.cxec4yk4254a.us-east-2.rds.amazonaws.com",
      user: "admin",
      password: "!SocialGrdn1!",
      database: "mysocialgrdn"
    });

    db.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
      }
      console.log('Connected to MySQL');
      console.log('Port 3306');
      console.log('Connection successful');
    });

    // Make the database connection available globally
    global.db = db;
  }
});