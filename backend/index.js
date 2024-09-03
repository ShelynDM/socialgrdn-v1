const express = require('express'); //  Express framework
const mysql = require('mysql'); // Importing the MySQL library for SQL functions
const bodyParser = require('body-parser'); // Importing body-parser for body parsing
const cors = require('cors'); // Importing CORS to allow cross-origin requests for different domains and server interactions
const path = require('path'); // for file path

const app = express(); // for middleware and routing
const port = 3001;

// MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost", // for connecting to local host
  port: 3306, // MySQL port (default is 3306)
  user: "admin", // MySQL username
  password: "!SocialGrdn1!", // MySQL password
  database: "mysocialgrdn" // MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL on port 3306');
});

// Make the database connection available globally
global.db = db;

// Middleware
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build'))); // Serving static files from the build directory

// API Endpoints
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/register', (req, res) => {
  const { email, firstname, lastname, username, profession, phoneNumber, userAddress, userCity, userProvince, userPostalCode } = req.body;

  if (!firstname || !lastname || !username) {
    return res.status(400).send('First name, last name, and username are required');
  }

  const query = 'INSERT INTO UserProfile (email, first_name, last_name, username, profession, phone_number, address_line1, city, province, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [email, firstname, lastname, username, profession, phoneNumber, userAddress, userCity, userProvince, userPostalCode];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('User registered successfully');
    }
  });
});

app.post('/api/check-user', (req, res) => {
  const { email } = req.body;
  console.log('Checking for user with email:', email);

  db.query('SELECT * FROM UserProfile WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  });
});

app.get('/api/profile', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  const query = 'SELECT * FROM UserProfile WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    } else {
      return res.status(200).json(results[0]);
    }
  });
});

// Catchall handler for any request that doesn't match an API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server running at http://localhost:${port}/LandingPage`);
  }
});
