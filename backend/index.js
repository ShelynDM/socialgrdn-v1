const express = require('express'); //  Express framework
const mysql = require('mysql'); // Importing the MySQL library for SQL fucntions
const bodyParser = require('body-parser'); // Importing body-parser for body parsing
const cors = require('cors'); // Importing CORS to allow cross-origin requests for different domains and server interactions
const path = require('path'); // for file path

const app = express(); // for middleware and routing
const port = 3001;

// Middleware
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build'))); // Serving static files from the build directory

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//pushing from front end to database
//this is an api endpoint that will be used to register a user in the database
//This is a whole method that will be used to register a user in the database
app.post('/api/register', (req, res) => {
  const { email, firstname, lastname, username, profession, phoneNumber, userAddress, userCity, userProvince, userPostalCode } = req.body;

  // Check if required fields are present
  if (!firstname || !lastname || !username) {
    return res.status(400).send('First name, last name, and username are required');
  }

  // Update SQL query and values to exclude email and password
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
// ==========================//===========================//======================
// This is an API endpoint that will be used to check if a user exists in the database
app.post('/api/check-user', async (req, res) => {
  const { email } = req.body;
  console.log('Checking for user with email:', email); // Debugging
  try {
    const result = await db.query('SELECT * FROM UserProfile WHERE email = ?', [email]);
    console.log('Query result:', result); // Debugging
    if (result.length > 0) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ==========================//===========================//======================

// API endpoint to get user profile based on email
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


// The "catchall" handler: for any request that doesn't
//Ensures that any undefined routes still load your React app,
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
// listening for incoming requests
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server running at http://localhost:${port}/LandingPage`);

    //MySQL connection configuration
    const db = mysql.createConnection({
      host: "camysocialgrdn.cbsqsgmsu22j.ca-central-1.rds.amazonaws.com", // Replace with your MySQL host
      user: "admin", // MySQL username
      password: "!SocialGrdn1!", // MySQL password
      database: "camysocialgrdn" // MySQL database name
    });

    //issue handling
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

