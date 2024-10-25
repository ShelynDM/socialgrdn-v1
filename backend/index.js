/**
 * index.js
 * Description: This is the file that handles the server setup and database connection
 * Backend Author:  Donald Jans Uy
 *                  Doniyor Rakhmanov
 *                  Lilian Huh
 *                  Shelyn Del Mundo
 *                  Tiana Bautista
 * Date: 2024-10-23
 */

// Import the credentials from the _credentials.js file
const credentials = require('./_credentials');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import route files
const userRoutes = require('./api/RegisterAPI');
const getIDRoutes = require('./api/GetuserIDAPI');
const editProfileRoutes = require('./api/EditProfileAPI');
const getProfileRoutes = require('./api/GetUserProfileAPI');
const getUserPropertiesRoutes = require('./api/GetUserPropAPI');
const getSearchResultsRoutes = require('./api/GetSearchResultsAPI');
const getPropDetailsRoutes = require('./api/GetPropDetailsAPI');
const getRentalDetailsRoutes = require('./api/GetRentalDetailsAPI');
const addPropertyListingRoutes = require('./api/addPropertyListingAPI');// Import your new addPropertyListingAPI
const getRentalListRoutes = require('./api/GetRentalListAPI');
const registerRentalDetailsRoutes = require('./api/RegisterRentalDetailsAPI');
const editRentalDetailsRoutes = require('./api/EditRentalAPI');

const stripeCheckoutSession = require('./api/create-checkout-session');  //payment route

const getPayoutsRoutes = require('./api/GetPayoutAPI');
const getEarningsRoutes = require('./api/GetEarningsAPI');
const getDetailedPayoutsRoutes = require('./api/GetDetailedPayoutAPI');
const getPropStatusRoutes = require('./api/GetPropStatusAPI');
const updatePropStatusRoutes = require('./api/UpdatePropStatusAPI');
const getUserRoleRoutes = require('./api/GetUserRoleAPI');
const getAllUsersRoutes = require('./api/GetAllUsersAPI');
const HandleUserStatusAPI = require('./api/HandleUserStatusAPI');

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
app.use('/api/getUserProperties', getUserPropertiesRoutes);
app.use('/api/getSearchResults', getSearchResultsRoutes);
app.use('/api/getPropertyDetails', getPropDetailsRoutes);
app.use('/api/GetRentalDetails', getRentalDetailsRoutes);
app.use('/api/addPropertyListing', addPropertyListingRoutes);
app.use('/api/getRentalList', getRentalListRoutes);
app.use('/api/create-checkout-session', stripeCheckoutSession); //payment route
app.use('/api/registerRentalDetails', registerRentalDetailsRoutes);
app.use('/api/editRentalDetails', editRentalDetailsRoutes);

app.use('/api/addPropertyListing', addPropertyListingRoutes);// Add the new route for addPropertyListingAPI
app.use('/api/getPayouts', getPayoutsRoutes);
app.use('/api/getEarnings', getEarningsRoutes);
app.use('/api/getDetailedPayouts', getDetailedPayoutsRoutes);
app.use('/api/getPropStatus', getPropStatusRoutes);
app.use('/api/updatePropStatus', updatePropStatusRoutes);

app.use('/api/getUserRole', getUserRoleRoutes);
app.use('/api/getAllUsers', getAllUsersRoutes);
app.use('/api/handleUserStatus', HandleUserStatusAPI);


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
      // Use the db credentials from the _credentials.js file
      host: credentials.host,
      user: credentials.user,
      password: credentials.password,
      database: credentials.database
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