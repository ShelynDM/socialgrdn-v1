const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// MySQL connection configuration
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST, // Replace with your MySQL host
  user: process.env.MYSQL_USER, // MySQL username
  password: process.env.MYSQL_PASSWORD, // MySQL password
  database: process.env.MYSQL_DATABASE // MySQL database name
});

// Define routes
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM userprofile', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/register', (req, res) => {
  const { firstname, lastname, username, profession, phoneNumber, userAddress, userCity, userProvince, userPostalCode } = req.body;

  // Check if required fields are present
  if (!firstname || !lastname || !username) {
    return res.status(400).send('First name, last name, and username are required');
  }

  // Update SQL query and values to exclude email and password
  const query = 'INSERT INTO userprofile (first_name, last_name, username, profession, phone_number, address_line1, city, province, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [firstname, lastname, username, profession, phoneNumber, userAddress, userCity, userProvince, userPostalCode];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('User registered successfully');
    }
  });
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server running at http://localhost:${port}/`);

    // Establish MySQL connection
    const db = mysql.createConnection({
      host: "mysocialgrdn.cxec4yk4254a.us-east-2.rds.amazonaws.com", // Replace with your MySQL host
      user: "admin", // MySQL username
      password: "!SocialGrdn1!", // MySQL password
      database: "mysocialgrdn" // MySQL database name
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
